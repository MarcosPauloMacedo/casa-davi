'use client'

import { useSearchParams } from "next/navigation";
import { UserFormControl } from "./form-control"
import { FormularioText as text } from "./formulario-text"
import { PageHeader } from "@/components/page-header"

export function FormularioUsuario() {
    const userId = useSearchParams().get('id') || '';

    const title = userId ? text.edit.title : text.create.title;
    const description = userId ? text.edit.description : text.create.description;

    return (
        <div className="container">
            <PageHeader title={title} description={description} />
            <UserFormControl />
        </div>
    )
}