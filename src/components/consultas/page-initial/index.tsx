'use client'

import { PageHeader } from "@/components/page-header";
import { pageInitialText as text } from "./page-initial-text";
import { PageInitialForm } from "./formulario";
import { useEffect, useState } from "react";
import { Panel } from "./panel";
import { useSearchParams } from "next/navigation";

export function PageInitial() {
    const paciente = useSearchParams().get('paciente');

    const [pacientId, setPacienteId] = useState<string>();
    const [stepForm, setStepForm] = useState<boolean>(false);
    const [stepList, setStepList] = useState<boolean>(false);

    useEffect(() => {
        if (paciente) {
            setStepList(true);
            setPacienteId(paciente);
        } else {
            setStepForm(true);
        }
    }, [paciente]);

    useEffect(() => {
        if (stepForm) setStepList(false);
    }, [stepForm]);

    useEffect(() => {
        if (stepList) setStepForm(false);
    }, [stepList]);

    return (
        <div className="container">
            <PageHeader
                title={text.title}
                description={text.description}
                routerButton="/inicio"
            />
            {stepForm && (
                <PageInitialForm 
                    setPacienteId={setPacienteId} 
                    nextStep={() => setStepList(true)}
                />
            )}
            {stepList && (
                <Panel 
                    previousStep={() => setStepForm(true)} 
                    pacienteId={pacientId}
                />
            )}
        </div>
    )
}