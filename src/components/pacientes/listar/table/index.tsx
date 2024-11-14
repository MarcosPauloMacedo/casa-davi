'use client'

import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { IPaciente, IPacienteTable } from "@/interfaces/IPaciente"
import { Status } from "@/utils/status-enum"
import { deletePaciente, getAllPacientes } from "@/services/pacientes"
import { Fragment, useEffect, useState } from "react"
import { StatusComponent } from "@/utils/status-component-enum"
import { LoadingCard } from "@/components/loading/card"
import { ConfirmDialogDelete } from "@/components/all-dialogs/confirm-dialog-delete"
import { SuccessDialog } from "@/components/all-dialogs/success-dialog"
import { useRouter } from "next/navigation"
import { ErrorDialog } from "@/components/all-dialogs/error-dialog"
import { tableText as text } from "./table-text"

const createPacienteTable = (pacientes: IPaciente[]): IPacienteTable[] => {
  return pacientes.map(paciente => {
    return {
      ...paciente,
      status: Status[paciente.status]
    }
  })
}

export function PacienteTable() {
  const router = useRouter()

  const [pacientesForm, setPacientesForm] = useState<IPacienteTable[]>([])
  const [status, setStatus] = useState<StatusComponent>(StatusComponent.LOADING)
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [errorNotFoundDialog, setErrorNotFoundDialog] = useState<boolean>(false)
  const [errorDeleteDialog, setDeleteErrorDialog] = useState<boolean>(false)
  const [successDialog, setSuccessDialog] = useState<boolean>(false)
  const [description, setDescription] = useState<string>()
  const [data, setData] = useState<IPacienteTable>()

  const handleError = () => {
    setStatus(StatusComponent.ERROR)
    setErrorNotFoundDialog(true)
  }

  const fetchPacientes = async () => {
    const response = await getAllPacientes()

    if(response.ok) {
      const pacientes = await response.json()
      
      const pacienteForm = createPacienteTable(pacientes)

      setPacientesForm(pacienteForm)
      setStatus(StatusComponent.SUCCESS)

    } else {
      handleError()
    }
  }

  useEffect(() => {
    fetchPacientes()
  }, []);

  const openDeleteDialog = (data: IPacienteTable) => {
    setDescription(`Deseja apagar o paciente ${data.name}?`)
    setConfirmDialog(true)
    setData(data)
  }

  const closeSuccessDialog = (open: boolean) => {
    setSuccessDialog(open)
    fetchPacientes()
  }

  const closeNotFoundDialog = (open: boolean) => {
    setErrorNotFoundDialog(open)
    router.back()
  }

  const deletePacienteById = async () => {
    setConfirmDialog(false)

    if (!data) return

    const response = await deletePaciente(data.id)

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
            descriptionText={text.descriptionGetAllError}
          />
        )
      }
      {status === StatusComponent.SUCCESS && (
        <DataTable 
          columns={columns} 
          data={pacientesForm} 
          onDelete={(data)=> openDeleteDialog(data)} 
        />
      )}
      <ConfirmDialogDelete 
        isOpen={confirmDialog} 
        setIsOpen={setConfirmDialog} 
        description={description}
        event={deletePacienteById}
      />
      <SuccessDialog
        isOpen={successDialog}
        setIsOpen={closeSuccessDialog}
        descriptionText={text.descriptionSuccess}
      />
      <ErrorDialog
        isOpen={errorDeleteDialog}
        setIsOpen={setDeleteErrorDialog}
        descriptionText={text.descriptionDeleteError}
      />
    </Fragment>
  )
}