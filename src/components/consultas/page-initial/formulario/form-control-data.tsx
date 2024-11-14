'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    pacientId: z.string().min(1)
})

function formValues() {
    return (
        useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                pacientId: ''
            }
        })
    )
}

export { formSchema, formValues }