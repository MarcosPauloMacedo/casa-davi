'use client'

import { IParentesco } from "@/interfaces/IParentesco";
import { formSchema, useFormValues } from "./form-control-data";
import { IPaciente } from "@/interfaces/IPaciente";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { StatusComponent } from "@/utils/status-component-enum";
import { formControlText as text } from "./form-control-text";
import { createParentesco, parentescoByPacientId, updateByPacienteId } from "@/services/parentesco";
import { z } from "zod";
import { FormControlBox } from "@/components/form/form-control-box";
import { ErrorDialog } from "@/components/all-dialogs/error-dialog";
import { LoadingCard } from "@/components/loading/card";
import { Form } from "@/components/ui/form";
import { Field } from "@/components/form/fields";
import { SuccessDialog } from "@/components/all-dialogs/success-dialog";

import styles from '../../../../form/form.module.css'
import { Button } from "@/components/ui/button";

interface formEnderecoProps {
    paciente: IPaciente | undefined;
    parentesco: IParentesco | undefined;
    setParentesco: (parentesco: IParentesco) => void;
    previusStep: () => void;
}

const createParentescoToSave = (parentescoToSave: any, pacienteId: string): 
    IParentesco => {

    return {
        ...parentescoToSave,
        pacienteId: pacienteId
    }
}

export function FormParentesco({ paciente, previusStep, parentesco, setParentesco }:
    formEnderecoProps) {

    const router = useRouter();

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [statusComponent, setStatusComponent] = useState<StatusComponent>(StatusComponent.LOADING);
    const [addressAlreadySaved, setAddressAlreadySaved] = useState<boolean>(false);
    const [dialogSuccess, setDialogSuccess] = useState<boolean>(false);
    const [dialogNotFoundError, setDialogNotFoundError] = useState<boolean>(false);
    const [dialogErrorForm, setDialogErrorForm] = useState<boolean>(false);
    const [descriptionSuccessDialog, setDescriptionSuccessDialog] = useState<string>('');
    const [descriptionErrorDialog, setDescriptionErrorDialog] = useState<string>('');

    const form = useFormValues();

    const previus = () => {
        const parentesco = form.getValues() as IParentesco;
        setParentesco(parentesco);
        previusStep();
    }

    const handleError = () => {
        setStatusComponent(StatusComponent.ERROR);
        setDescriptionErrorDialog(text.dialogs.error);
        setDialogNotFoundError(true)
    }

    const getParentescoByPacienteId = async (pacienteId: string) => {
        const response = await parentescoByPacientId(pacienteId);

        if(response.ok) {
            const parentesco = await response.json();
            
            if(parentesco.length) {
                setAddressAlreadySaved(true);
                setParentesco(parentesco[0]);
            }

        } else {
            handleError()
        }
    }

    const updateParentescoByPacienteId = async (
        pacienteId: string, parentescoToSave: IParentesco) => {
        setStatusComponent(StatusComponent.LOADING);

        const response = await updateByPacienteId(pacienteId, parentescoToSave);

        if(response.ok) {
            setDescriptionSuccessDialog(text.dialogs.editSuccess)
            setDialogSuccess(true);
        } else {
            setStatusComponent(StatusComponent.SUCCESS);
            setDescriptionErrorDialog(text.dialogs.editError);
            setDialogErrorForm(true);
        }
    }
    
    const createNewParentesco = async (parentescoToSave: IParentesco) => {
        setStatusComponent(StatusComponent.LOADING);

        const response = await createParentesco(parentescoToSave);

        if(response.ok) {
            setDescriptionSuccessDialog(text.dialogs.createSuccess);
            setDialogSuccess(true);
        } else {
            setStatusComponent(StatusComponent.SUCCESS);
            setDescriptionErrorDialog(text.dialogs.createError);
            setDialogErrorForm(true);
        }
    }

    const closeNotFoundDialog = (open: boolean) => {
        setDialogNotFoundError(open);
        router.back();
    }

    const closeSuccessDialog = (open: boolean) => {
        setDialogSuccess(open);
        router.push('/pacientes');
    }

    useEffect(() => {
        if (paciente) {
            getParentescoByPacienteId(paciente.id)
        }

    }, [paciente, form])

    useEffect(() => {
        if (parentesco && addressAlreadySaved) {
            form.reset(parentesco);
            setIsEdit(true);
        }

        if (parentesco && !addressAlreadySaved) {
            form.reset(parentesco);
        }

        setStatusComponent(StatusComponent.SUCCESS);

    }, [parentesco])
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if(!paciente) return;
        
        const endereco = createParentescoToSave(values, paciente.id);

        if(isEdit) updateParentescoByPacienteId(paciente.id, endereco);     
        else createNewParentesco(endereco)
    }

    return (
        <Fragment>
            {statusComponent != StatusComponent.NONE && (
                <FormControlBox>
                    {statusComponent === StatusComponent.LOADING && <LoadingCard />}
                    {statusComponent === StatusComponent.ERROR && (
                        <ErrorDialog
                            isOpen={dialogNotFoundError}
                            setIsOpen={closeNotFoundDialog}
                            descriptionText={descriptionErrorDialog}
                        />)
                    }
                    {statusComponent === StatusComponent.SUCCESS && (
                        <Form {...form}>
                            <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
                                <div className={styles.formContent}>
                                    <Field
                                        className="col-span-12 md:col-span-6"
                                        form={form}
                                        name="nome"
                                        label="Nome do Parente"
                                        placeholder="digite o nome do parente"
                                        description={text.descriptions.nome}
                                    />
                                    <Field
                                        className="col-span-12 md:col-span-6"
                                        form={form}
                                        name="grauParentesco"
                                        label="Grau de Parentesco"
                                        placeholder="digite o grau de parentesco"
                                        description={text.descriptions.grauParentesco}
                                    />
                                </div>
                                <div className='flex gap-3 mt-4'>
                                    <Button
                                        type='button'
                                        onClick={previus}
                                        className={styles.button}
                                        variant="secondary">
                                        Anterior
                                    </Button>
                                    <Button
                                        type='submit'
                                        className={styles.button}
                                        variant="secondary">
                                        Salvar
                                    </Button>
                                </div>
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
            )}
        </Fragment>
    )
}