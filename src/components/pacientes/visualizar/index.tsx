'use client'

import { visualizarText as text } from "./visualizar-text";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IPaciente } from "@/interfaces/IPaciente";
import { StatusComponent } from "@/utils/status-component-enum";
import { getPacienteById } from "@/services/pacientes";
import { VisualizarData } from "./visualizar-data";

import { PageView } from "@/components/page-view";

export function VisualizarPaciente() {
    const id = useSearchParams().get('id') || '';

    const router = useRouter();

    const [paciente, setPaciente] = useState<IPaciente>({} as IPaciente);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [statusComponent, setStatusComponent] = useState(StatusComponent.LOADING);

    const handleError = () => {
        setStatusComponent(StatusComponent.ERROR)
        setOpenDialog(true);
    };

    const closeDialog = (open: boolean) => {
        setOpenDialog(open);
        router.back();
    };

    const getPaciente = async () => {
        const response = await getPacienteById(id);

        if(response.ok) {
            const paciente = await response.json();

            setPaciente(paciente);
            setStatusComponent(StatusComponent.SUCCESS);
        
        } else {
            handleError();
        }
    };

    useEffect(() => {
        if(id) {
            getPaciente();
        } else {
            handleError();
        }

    }, [])

    return (
       <PageView
            title={text.title}
            status={statusComponent}
            img={{
                src: text.img.src, 
                alt: text.img.alt
            }}
            errorDialog={{
                isOpen: openDialog, 
                setIsOpen: closeDialog, 
                description: text.dialogError
            }}>
            <VisualizarData paciente={paciente} />
        </PageView>
    )
}