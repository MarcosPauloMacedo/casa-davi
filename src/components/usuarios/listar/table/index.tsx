'use client'

import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { IUser, IUserTable } from "@/interfaces/IUser"
import { Status } from "@/utils/status-enum"
import { deleteUser, getAllUsers } from "@/services/users"
import { Fragment, useEffect, useState } from "react"
import { StatusComponent } from "@/utils/status-component-enum"
import { LoadingCard } from "@/components/loading/card"
import { ConfirmDialogDelete } from "@/components/all-dialogs/confirm-dialog-delete"
import { SuccessDialog } from "@/components/all-dialogs/success-dialog"
import { useRouter } from "next/navigation"
import { ErrorDialog } from "@/components/all-dialogs/error-dialog"
import { tableText as text } from "./table-text"

const createUserTable = (users: IUser[]): IUserTable[] => {
  return users.map(user => {
    return {
      ...user,
      status: Status[user.status]
    }
  })
}

export function UsuarioTable() {
  const router = useRouter()

  const [usersForm, setUsersForm] = useState<IUserTable[]>([])
  const [status, setStatus] = useState<StatusComponent>(StatusComponent.LOADING)
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [successDialog, setSuccessDialog] = useState<boolean>(false)
  const [errorNotFoundDialog, setErrorNotFoundDialog] = useState<boolean>(false)
  const [errorDeleteDialog, setDeleteErrorDialog] = useState<boolean>(false)
  const [description, setDescription] = useState<string>()
  const [data, setData] = useState<IUserTable>()

  const handleError = () => {
    setStatus(StatusComponent.ERROR)
    setErrorNotFoundDialog(true)
  }

  const fetchUsers = async () => {
    const response = await getAllUsers()

    if(response.ok) {
      const users = await response.json()
      
      const userForm = createUserTable(users)

      setUsersForm(userForm)
      setStatus(StatusComponent.SUCCESS)

    } else {
      handleError()
    }
  }

  useEffect(() => {
    fetchUsers()
  }, []);

  const openDeleteDialog = (data: IUserTable) => {
    setDescription(`Deseja apagar o usuário ${data.name}?`)
    setConfirmDialog(true)
    setData(data)
  }

  const closeSuccessDialog = (open: boolean) => {
    setSuccessDialog(open)
    fetchUsers()
  }

  const closeNotFoundDialog = (open: boolean) => {
    setErrorNotFoundDialog(open)
    router.back()
  }

  const deleteUserById = async () => {
    setConfirmDialog(false)

    if (!data) return

    const response = await deleteUser(data.id)

    if (response.ok) {
      setSuccessDialog(true);

    } else {
      setDeleteErrorDialog(true)
    }
  }

  return (
    <Fragment>
      {status === StatusComponent.LOADING && <LoadingCard />}
      {status === StatusComponent.ERROR && (
          <ErrorDialog
            isOpen={errorNotFoundDialog} 
            setIsOpen={closeNotFoundDialog}
            descriptionText={text.dialogError}
          />
        )
      }
      {status === StatusComponent.SUCCESS && (
        <DataTable 
          columns={columns} 
          data={usersForm} 
          onDelete={(data)=> openDeleteDialog(data)} 
        />
      )}
      <ConfirmDialogDelete 
        isOpen={confirmDialog} 
        setIsOpen={setConfirmDialog}
        description={description}
        event={deleteUserById}
      />
      <SuccessDialog
        isOpen={successDialog}
        setIsOpen={closeSuccessDialog}
        descriptionText="Usuário apagado com sucesso!"
      />
      <ErrorDialog
        isOpen={errorDeleteDialog}
        setIsOpen={setDeleteErrorDialog}
        descriptionText="Erro ao apagar usuário!"
      />
    </Fragment>
  )
}