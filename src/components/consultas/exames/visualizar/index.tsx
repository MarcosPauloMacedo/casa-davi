'use client'

import { AccordionBox } from "@/components/accordion-box";
import { PageHeader } from "@/components/page-header";
import { Accordion } from "@/components/ui/accordion";
import { IExame } from "@/interfaces/IExame";
import { IPaciente } from "@/interfaces/IPaciente";
import { getExameById } from "@/services/exames";
import { getPacienteById } from "@/services/pacientes";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { VisualizarExameData } from "./visualizar-data";

export function VisualizarExame() {
    const exameId = useSearchParams().get('id') || '';

    const [exame, setExame] = useState<IExame>();
    const [paciente, setPaciente] = useState<IPaciente>();

    const findExameById = async () => {
        const response = await getExameById(exameId);

        if(response.ok) {
            const Exame: IExame = await response.json();
            setExame(Exame);
        }
    }

    const findPacienteById = async () => {
        if(!exame) return;
        const response = await getPacienteById(exame.pacienteId);

        if(response.ok) {
            const paciente: IPaciente = await response.json();
            setPaciente(paciente);
        }
    }

    useEffect(() => {
        findExameById();
    }, [exameId]);

    useEffect(() => {
        findPacienteById();
    }, [exame]);

    return (
        <div className="container">
            <PageHeader
                title="Visualizar Exame"
                description="Visualize o Exame realizado pelo paciente"
            />
            <Accordion type="single" collapsible>
                <AccordionBox value="1" title="Informações">
                    <VisualizarExameData exame={exame} paciente={paciente} />
                </AccordionBox>
            </Accordion>
        </div>
    )
}