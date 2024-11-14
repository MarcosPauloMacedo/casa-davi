'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(2).max(50),
    surname: z.string().min(2).max(50),
    cpf: z.string().min(11).max(50),
    dateOfBirth: z.string().min(2).max(10),
    status: z.boolean().default(false).optional()
})

function useFormValues() {
    return (
        useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                name: "",
                surname: "",
                cpf: "",
                dateOfBirth: "",
                status: true
            }
        })
    )
}

export { formSchema, useFormValues }