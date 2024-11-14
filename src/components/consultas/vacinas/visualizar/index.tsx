'use client'

import { AccordionBox } from "@/components/accordion-box";
import { PageHeader } from "@/components/page-header";
import { Accordion } from "@/components/ui/accordion";
import { VisualizarVacinaData } from "./visualizar-data";
import { useEffect, useState } from "react";
import { IVacina } from "@/interfaces/IVacina";
import { getVacinaById } from "@/services/vacinas";
import { useSearchParams } from "next/navigation";
import { getPacienteById } from "@/services/pacientes";
import { IPaciente } from "@/interfaces/IPaciente";

export function VisualizarVacina() {
    const vacinaId = useSearchParams().get('id') || '';

    const [vacina, setVacina] = useState<IVacina>();
    const [paciente, setPaciente] = useState<IPaciente>();

    const findVacinaById = async () => {
        const response = await getVacinaById(vacinaId);

        if(response.ok) {
            const vacina: IVacina = await response.json();
            setVacina(vacina);
        }
    }

    const findPacienteById = async () => {
        if(!vacina) return;
        const response = await getPacienteById(vacina.pacienteId);

        if(response.ok) {
            const paciente: IPaciente = await response.json();
            setPaciente(paciente);
        }
    }

    useEffect(() => {
        findVacinaById();
    }, [vacinaId]);

    useEffect(() => {
        findPacienteById();
    }, [vacina]);

    return (
        <div className="container">
            <PageHeader
                title="Visualizar Vacina"
                description="Visualize a vacina tomada pelo paciente"
            />
            <Accordion type="single" collapsible>
                <AccordionBox value="1" title="Informações">
                    <VisualizarVacinaData vacina={vacina} paciente={paciente} />
                </AccordionBox>
            </Accordion>
        </div>
    )
}