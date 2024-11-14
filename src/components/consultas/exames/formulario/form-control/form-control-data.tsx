'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    nome: z.string().min(2).max(50),
    tratamento: z.string(),
    dataExame: z.string(),
    medicacao: z.string().min(6).max(300),
    relatorio: z.string().min(6).max(300),
})

function formValues() {
    return (
        useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                nome: "",
                tratamento: "",
                dataExame: "",
                medicacao: "",
                relatorio: "",
            }
        })
    )
}

export { formSchema, formValues }