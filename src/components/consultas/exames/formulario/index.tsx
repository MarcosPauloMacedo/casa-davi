'use client'

import { PageHeader } from "@/components/page-header";
import { useSearchParams } from "next/navigation";
import { formExameText as text } from "./form-text";
import { ExameFormControl } from "./form-control";

export function FormularioExame() {
    const pacienteId = useSearchParams().get('id') || '';

    const title = pacienteId ? text.edit.title : text.create.title;
    const description = pacienteId ? text.edit.description : text.create.description;
    
    return (
        <div className="container">
            <PageHeader title={title} description={description} />
            <ExameFormControl />
        </div>
    )
}