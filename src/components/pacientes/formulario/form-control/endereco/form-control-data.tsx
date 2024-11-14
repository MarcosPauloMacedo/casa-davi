'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    estado: z.string().min(2).max(2),
    cidade: z.string().min(2).max(50),
    bairro: z.string().min(2).max(50),
    rua: z.string().min(2).max(50),
    numero: z.number().min(1).max(9999),
})

function useFormValues() {
    return (
        useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                estado: "",
                cidade: "",
                bairro: "",
                rua: "",
                numero: 1,
            }
        })
    )
}

export { formSchema, useFormValues }