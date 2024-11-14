'use client'

import { AlertInfo } from "@/components/alerts/alert-info"
import { PageHeader } from "@/components/page-header"
import { IPaciente } from "@/interfaces/IPaciente";
import { getPacienteById } from "@/services/pacientes";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { VacinasTable } from "./table";
import { listText as text } from "./list-text";
import { setCookies } from "@/services/cookies";

export function ListarVacinas() {
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
            <VacinasTable paciente={paciente} />
        </div>
    )
}