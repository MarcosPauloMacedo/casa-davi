'use client'

import { PageHeader } from "@/components/page-header";
import { VacinaFormControl } from "./form-control";
import { useSearchParams } from "next/navigation";
import { formularioVacinaText as text } from "./form-text";

export function FormularioVacina() {
    const pacienteId = useSearchParams().get('id') || '';

    const title = pacienteId ? text.edit.title : text.create.title;
    const description = pacienteId ? text.edit.description : text.create.description;
    
    return (
        <div className="container">
            <PageHeader title={title} description={description} />
            <VacinaFormControl />
        </div>
    )
}