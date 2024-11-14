'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(2).max(50),
    username: z.string().min(2).max(50),
    password: z.string().min(6).max(50),
    email: z.string().email(),
    status: z.boolean().default(false).optional()
})

function formValues() {
    return (
        useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                name: "",
                username: "",
                password: "",
                email: "",
                status: true
            }
        })
    )
}

export { formSchema, formValues }