'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(2).max(50),
    dataAplicacao: z.string(),
    tratamento: z.string().min(6).max(50),
    observacao: z.string().min(6).max(300),
})

function formValues() {
    return (
        useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                name: "",
                dataAplicacao: '',
                tratamento: "",
                observacao: "",
            }
        })
    )
}

export { formSchema, formValues }