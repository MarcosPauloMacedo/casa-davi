import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    username: z.string().min(1, { message: "Campo obrigatório" }),
    password: z.string().min(1, { message: "Campo obrigatório" })
})

function useFormValues(){
    return (
        useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
                username: "",
                password: "",
            }
        })
    )
}

export { formSchema, useFormValues }