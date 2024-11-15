'use client'

import { Field } from "@/components/form/fields"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { setToken } from "@/services/cookies"
import { logIn } from "@/services/login"
import { useRouter } from "next/navigation"
import { Fragment } from "react"
import { useFormValues } from "./form-control-data"

import styles from './form.module.css'

const HeaderForm = () => {
    return (
        <header className={styles.header}>
            <h2 className={styles.title}>
                <span className={styles.spanTitle}>
                    Bem Vindo à  
                </span> Casa de Davi
            </h2> 
        </header>
    )
}

const SubtitleForm = () => {
    return (
        <div className={styles.headerForm}>
            <hr className={styles.hr}></hr>
            <span className={styles.spanHeaderForm}>Entre com o seu Login</span>
            <hr className={styles.hr}></hr>
        </div>
    )
}

export function LoginForm() {
    const router = useRouter()
    const form = useFormValues()

    const isSubmitSuccess = async () => {    
        const response = await logIn();

        if(response.ok) {
            const user = await response.json()
            setToken(user)
            return true;
        } 

        return false;
    }

    const onSubmit = async () => {
        const isSuccess = await isSubmitSuccess()

        if(isSuccess) {
            router.push('/inicio')
        } else {
            alert('Erro ao efetuar o loguin')
        }
    }

    return (
        <Fragment>
            <HeaderForm />
            <SubtitleForm />
            <Form {...form}>
                <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
                    <Field
                        form={form}
                        label="Usuário"
                        name="username"
                        placeholder="Digite seu usuário"
                    />
                    <Field
                        form={form}
                        label="Senha"
                        name="password"
                        placeholder="Digite sua senha"
                        typeInput="password"
                    />
                    <Button
                        className={styles.buttonForm}
                        variant="secondary"
                        type="submit">
                        Entrar
                    </Button>
                </form>
            </Form>
        </Fragment>
    )
}

