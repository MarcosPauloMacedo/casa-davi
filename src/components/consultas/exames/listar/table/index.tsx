import { ErrorDialog } from "@/components/all-dialogs/error-dialog"
import { LoadingCard } from "@/components/loading/card"
import { IExame } from "@/interfaces/IExame"
import { IPaciente } from "@/interfaces/IPaciente"
import { deleteExame, getExamesByPacienteId } from "@/services/exames"
import { StatusComponent } from "@/utils/status-component-enum"
import { useRouter } from "next/navigation"
import { Fragment, useEffect, useState } from "react"
import { tableText as text } from "./table-text"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { ConfirmDialogDelete } from "@/components/all-dialogs/confirm-dialog-delete"
import { SuccessDialog } from "@/components/all-dialogs/success-dialog"

interface ExamesTableProps {
    paciente: IPaciente | undefined
}

export function ExamesTable({ paciente }: ExamesTableProps) {
    const router = useRouter()
    
    const [exames, setExames] = useState<IExame[]>([])
    const [status, setStatus] = useState<StatusComponent>(StatusComponent.LOADING)
    const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
    const [errorNotFoundDialog, setErrorNotFoundDialog] = useState<boolean>(false)
    const [errorDeleteDialog, setDeleteErrorDialog] = useState<boolean>(false)
    const [successDialog, setSuccessDialog] = useState<boolean>(false)
    const [description, setDescription] = useState<string>()
    const [data, setData] = useState<IExame>()
    
    const handleError = () => {
        setStatus(StatusComponent.ERROR)
        setErrorNotFoundDialog(true)
    }
    
    const fetchExamesByPacienteId = async () => {
        if(!paciente?.id) return;
        const response = await getExamesByPacienteId(paciente.id);
    
        if(response.ok) {
        const exames = await response.json()
        setExames(exames)
    
        } else {
        handleError()
        }
    }
    
    useEffect(() => {
        fetchExamesByPacienteId()

        setStatus(StatusComponent.SUCCESS)
    }, [paciente]);
    
    const openDeleteDialog = (data: IExame) => {
        setDescription(`Deseja apagar o exame ${data.nome}?`)
        setConfirmDialog(true)
        setData(data)
    }
    
    const closeSuccessDialog = (open: boolean) => {
        setSuccessDialog(open)
        fetchExamesByPacienteId()
    }
    
    const closeNotFoundDialog = (open: boolean) => {
        setErrorNotFoundDialog(open)
        router.back()
    }
    
    const deleteExameById = async () => {
        setConfirmDialog(false)
    
        if (!data) return
    
        const response = await deleteExame(data.id)
    
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
                    data={exames} 
                    onDelete={(data)=> openDeleteDialog(data)} 
                />
            )}
            <ConfirmDialogDelete 
                isOpen={confirmDialog} 
                setIsOpen={setConfirmDialog} 
                description={description}
                event={deleteExameById}
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