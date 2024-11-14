'use client'

import { ErrorDialog } from "@/components/all-dialogs/error-dialog";
import { SuccessDialog } from "@/components/all-dialogs/success-dialog";
import { Field, FieldCheckbox } from "@/components/form/fields";
import { LoadingCard } from "@/components/loading/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { IUser, IUserCreate, IUserForm } from "@/interfaces/IUser";
import { createUser, getUserById, updateUser } from "@/services/users";
import { StatusComponent } from "@/utils/status-component-enum";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import { formSchema, useFormValues } from "./form-control-data";
import { formControlText as text } from "./form-control-text";
import { FormControlBox } from "@/components/form/form-control-box";

import styles from '../../../form/form.module.css';

const createUserForm = (users: IUser): IUserForm => {
    return {
        ...users,
        status: users.status === 'ACTIVE' ? true : false
    }
}

const createUserToSave = (user: z.infer<typeof formSchema>): IUserCreate => {    
    return {
        ...user,
        status: user.status ? 'ACTIVE' : 'INACTIVE',
    }
}

export function UserFormControl() {
    const userId = useSearchParams().get('id') || '';

    const router = useRouter();

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [dialogSuccess, setDialogSuccess] = useState<boolean>(false);
    const [dialogNotFoundError, setDialogNotFoundError] = useState<boolean>(false);
    const [dialogErrorForm, setDialogErrorForm] = useState<boolean>(false);
    const [descriptionSuccessDialog, setDescriptionSuccessDialog] = useState<string>('');
    const [descriptionErrorDialog, setDescriptionErrorDialog] = useState<string>('');
    const [statusComponent, setStatusComponent] = useState<StatusComponent>
    (StatusComponent.LOADING);

    const form = useFormValues();

    const handleError = () => {
        setStatusComponent(StatusComponent.ERROR);
        setDescriptionErrorDialog(text.dialogs.error);
        setDialogNotFoundError(true)
    }

    const getUser = async () => {
        const response = await getUserById(userId);

        if(response.ok) {
            const user: IUser = await response.json();
            const userForm = createUserForm(user);
            
            form.reset(userForm);
            
        } else {
            handleError()
        } 
    }

    const updateUserById = async (userId: string, userToSave: IUserCreate) => {
        setStatusComponent(StatusComponent.LOADING);

        const response = await updateUser(userId, userToSave);

        if(response.ok) {
            setDescriptionSuccessDialog(text.dialogs.editSuccess);
            setDialogSuccess(true);

        } else {
            setStatusComponent(StatusComponent.SUCCESS);
            setDescriptionErrorDialog(text.dialogs.editError);
            setDialogErrorForm(true);
        }
    }
    
    const createNewUser = async (userToSave: IUserCreate) => {
        setStatusComponent(StatusComponent.LOADING);

        const response = await createUser(userToSave);

        if(response.ok) {
            setDescriptionSuccessDialog(text.dialogs.createSuccess);
            setDialogSuccess(true);

        } else {
            setStatusComponent(StatusComponent.SUCCESS);
            setDescriptionErrorDialog(text.dialogs.createError);
            setDialogErrorForm(true);
        }
    }

    const closeNotFoundErrorDialog = (open: boolean) => {
        setDialogNotFoundError(open);
        router.back();
    }

    const closeSuccessDialog = (open: boolean) => {
        setDialogSuccess(open);
        router.push('/usuarios');
    }

    useEffect(() => {
        if (userId) {
            setIsEdit(true);
            getUser();
        }

        setStatusComponent(StatusComponent.SUCCESS);

    }, [userId, form])
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const userToSave = createUserToSave(values);

        if(isEdit) updateUserById(userId, userToSave);      
        else createNewUser(userToSave);
    }

    return (
        <FormControlBox>
            {statusComponent === StatusComponent.LOADING && <LoadingCard />}
            {statusComponent === StatusComponent.ERROR && (
                <ErrorDialog
                    isOpen={dialogNotFoundError} 
                    setIsOpen={closeNotFoundErrorDialog}
                    descriptionText={descriptionErrorDialog}
                />)
            }
            {statusComponent === StatusComponent.SUCCESS && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
                        <div className={styles.formContent}>
                            <Field
                                className="col-span-12 md:col-span-8"
                                form={form}
                                name="name"
                                label="Name"
                                placeholder="José da Silva"
                                description={text.descriptions.name}
                            />
                            <Field
                                className="col-span-12 md:col-span-4"
                                form={form}
                                name="username"
                                label="Username"
                                placeholder="joseSilva"
                                description={text.descriptions.username}
                            />
                        </div>
                        <div className={styles.formContent}>
                            <Field
                                className="col-span-12 sm:col-span-6"
                                form={form}
                                name="password"
                                label="Password"
                                placeholder="********"
                                typeInput="password"
                                description={text.descriptions.password}
                            />
                            <Field
                                className="col-span-12 sm:col-span-6"
                                form={form}
                                name="email"
                                label="Email"
                                placeholder="endereço de email"
                                description={text.descriptions.email}
                            />
                        </div>
                        <FieldCheckbox
                            form={form}
                            name="status"
                            label="Ativo"
                            description={text.descriptions.status}
                        />
                        <Button
                            className={styles.button}
                            variant="secondary" 
                            type="submit">
                            {isEdit ? 'Atualizar Usuário' : 'Criar Usuário'}
                        </Button>
                    </form>
                </Form>
            )}
            <ErrorDialog
                isOpen={dialogErrorForm} 
                setIsOpen={setDialogErrorForm}
                descriptionText={descriptionErrorDialog}
            />
            <SuccessDialog
                isOpen={dialogSuccess}
                setIsOpen={closeSuccessDialog}
                descriptionText={descriptionSuccessDialog}
            />
        </FormControlBox>
    )
}