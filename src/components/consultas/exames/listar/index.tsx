'use client'

import { AlertInfo } from "@/components/alerts/alert-info";
import { PageHeader } from "@/components/page-header";
import { listText as text } from "./list-text";
import { useEffect, useState } from "react";
import { setCookies } from "@/services/cookies";
import { IPaciente } from "@/interfaces/IPaciente";
import { getPacienteById } from "@/services/pacientes";
import { useSearchParams } from "next/navigation";
import { ExamesTable } from "./table";

export function ListarExames() {
    const pacienteId = useSearchParams().get('paciente') || '';

    const [paciente, setPaciente] = useState<IPaciente>();

    const findPacienteById = async () => {
        const response = await getPacienteById(pacienteId);

        if(response.ok) {
            const paciente: IPaciente = await response.json();
            setCookies('paciente', pacienteId);
            setPaciente(paciente);
        }
    }

    useEffect(() => {
        findPacienteById();
    }, [pacienteId]);

    return (
        <div className="container">
            <PageHeader
                title={text.title}
                description={text.description(paciente?.name || '')}
                routerButton={`/consultas?paciente=${pacienteId}`}
            />
            <AlertInfo
                title={text.info.title}
                description={text.info.description}
            />
            <ExamesTable paciente={paciente} />
        </div>
    )
}