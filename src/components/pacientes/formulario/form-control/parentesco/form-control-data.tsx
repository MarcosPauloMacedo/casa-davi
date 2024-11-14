'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    nome: z.string().min(2).max(50),
    grauParentesco: z.string().min(2).max(50)
})

function formValues() {
    return (
        useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                nome: "",
                grauParentesco: "",
            }
        })
    )
}

export { formSchema, formValues }