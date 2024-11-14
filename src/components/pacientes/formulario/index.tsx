'use client'

import { useSearchParams } from "next/navigation";
import { PacienteFormControl } from "./form-control"
import { FormularioText as text } from "./formulario-text"
import { PageHeader } from "@/components/page-header"

export function FormularioPaciente() {
    const userId = useSearchParams().get('id') || '';

    const title = userId ? text.edit.title : text.create.title;
    const description = userId ? text.edit.description : text.create.description;

    return (
        <div className="container">
            <PageHeader title={title} description={description} />
            <PacienteFormControl />
        </div>
    )
}