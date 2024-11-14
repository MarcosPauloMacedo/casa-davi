'use client'

import { ConfirmDialogDelete } from "@/components/all-dialogs/confirm-dialog-delete"
import { ErrorDialog } from "@/components/all-dialogs/error-dialog"
import { SuccessDialog } from "@/components/all-dialogs/success-dialog"
import { LoadingCard } from "@/components/loading/card"
import { DataTable } from "@/components/ui/data-table"
import { StatusComponent } from "@/utils/status-component-enum"
import { Fragment, useEffect, useState } from "react"
import { columns } from "./columns"
import { tableText as text } from './table-text'
import { IVacina } from "@/interfaces/IVacina"
import { deleteVacina, getVacinasByPacienteId } from "@/services/vacinas"
import { IPaciente } from "@/interfaces/IPaciente"
import { useRouter } from "next/navigation"

interface VacinasTableProps {
    paciente: IPaciente | undefined
}

export function VacinasTable({ paciente }: VacinasTableProps) {
    const router = useRouter()
    
    const [vacinas, setVacinas] = useState<IVacina[]>([])
    const [status, setStatus] = useState<StatusComponent>(StatusComponent.LOADING)
    const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
    const [errorNotFoundDialog, setErrorNotFoundDialog] = useState<boolean>(false)
    const [errorDeleteDialog, setDeleteErrorDialog] = useState<boolean>(false)
    const [successDialog, setSuccessDialog] = useState<boolean>(false)
    const [description, setDescription] = useState<string>()
    const [data, setData] = useState<IVacina>()
    
    const handleError = () => {
        setStatus(StatusComponent.ERROR)
        setErrorNotFoundDialog(true)
    }
    
    const fetchVacinasByPacienteId = async () => {
        if(!paciente?.id) return;
        const response = await getVacinasByPacienteId(paciente.id);
    
        if(response.ok) {
        const vacinas = await response.json()
        
        setVacinas(vacinas)
    
        } else {
        handleError()
        }
    }
    
    useEffect(() => {
        fetchVacinasByPacienteId()

        setStatus(StatusComponent.SUCCESS)
    }, [paciente]);
    
    const openDeleteDialog = (data: IVacina) => {
        setDescription(`Deseja apagar a vacina ${data.name}?`)
        setConfirmDialog(true)
        setData(data)
    }
    
    const closeSuccessDialog = (open: boolean) => {
        setSuccessDialog(open)
        fetchVacinasByPacienteId()
    }
    
    const closeNotFoundDialog = (open: boolean) => {
        setErrorNotFoundDialog(open)
        router.back()
    }
    
    const deleteVacinaById = async () => {
        setConfirmDialog(false)
    
        if (!data) return
    
        const response = await deleteVacina(data.id)
    
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
                    data={vacinas} 
                    onDelete={(data)=> openDeleteDialog(data)} 
                />
            )}
            <ConfirmDialogDelete 
                isOpen={confirmDialog} 
                setIsOpen={setConfirmDialog} 
                description={description}
                event={deleteVacinaById}
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