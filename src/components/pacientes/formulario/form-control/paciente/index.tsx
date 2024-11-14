'use client'

import { Field, FieldCheckbox, FieldCPF } from '@/components/form/fields'
import { Button } from '@/components/ui/button'
import { formSchema, useFormValues } from './form-control-data'
import { formControlText as text } from './form-control-text'
import { IPaciente, IPacienteCreate, IPacienteForm } from '@/interfaces/IPaciente'
import { useRouter, useSearchParams } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { StatusComponent } from '@/utils/status-component-enum'
import { createPaciente, getPacienteById, updatePaciente } from '@/services/pacientes'
import { ErrorDialog } from '@/components/all-dialogs/error-dialog'
import { FormControlBox } from '@/components/form/form-control-box'
import { LoadingCard } from '@/components/loading/card'
import { Form } from '@/components/ui/form'
import { z } from 'zod'

import styles from '../../../../form/form.module.css'

const createPacienteForm = (pacientes: IPaciente): IPacienteForm => {
    return {
        ...pacientes,
        status: pacientes.status === 'ACTIVE' ? true : false
    }
}

const createPacienteToSave = (pacientes: any): IPacienteCreate => {
    return {
        ...pacientes,
        status: pacientes.status ? 'ACTIVE' : 'INACTIVE'
    }
}

interface FormPacienteProps{
    paciente: IPaciente | undefined;
    setPaciente: (paciente: IPaciente) => void;
    nextStep: () => void;
}

export function FormPaciente( { paciente, setPaciente, nextStep }: 
    FormPacienteProps ) {

    const pacienteId = useSearchParams().get('id') || '';

    const router = useRouter();

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [statusComponent, setStatusComponent] = useState<StatusComponent>(StatusComponent.LOADING);
    const [dialogNotFoundError, setDialogNotFoundError] = useState<boolean>(false);
    const [dialogErrorForm, setDialogErrorForm] = useState<boolean>(false);
    const [descriptionErrorDialog, setDescriptionErrorDialog] = useState<string>('');

    const form = useFormValues();

    const handleError = () => {
        setStatusComponent(StatusComponent.ERROR);
        setDescriptionErrorDialog(text.dialogs.error);
        setDialogNotFoundError(true)
    }

    const getPaciente = async () => {
        const response = await getPacienteById(pacienteId);

        if(response.ok) {
            const paciente: IPaciente = await response.json();
            setPaciente(paciente);
        } else {
            handleError();
        }
    }

    const updatePacienteById = async (pacienteId: string, pacienteToSave: IPacienteCreate) => {
        setStatusComponent(StatusComponent.LOADING);

        const response = await updatePaciente(pacienteId, pacienteToSave)

        if(response.ok) {  
            const updatedPaciente = await response.json();
            setPaciente(updatedPaciente);
            nextStep();
        } else {
            setStatusComponent(StatusComponent.SUCCESS);
            setDescriptionErrorDialog(text.dialogs.editError);
            setDialogErrorForm(true);
        }
    }

    const updatePacienteCreated = async (pacienteToSave: IPacienteCreate) => {
        setStatusComponent(StatusComponent.LOADING);

        if(paciente) {
            const response = await updatePaciente(paciente.id, pacienteToSave);

            if(response.ok) {
                const updatedPaciente = await response.json();
                setPaciente(updatedPaciente);
                nextStep();
            } else {
                setStatusComponent(StatusComponent.SUCCESS);
                setDescriptionErrorDialog(text.dialogs.editError);
                setDialogErrorForm(true);
            }
        }
    }
    
    const createNewPaciente = async (pacienteToSave: IPacienteCreate) => {
        setStatusComponent(StatusComponent.LOADING);

        const response = await createPaciente(pacienteToSave);

        if(response.ok) {
            const paciente = await response.json();
            setPaciente(paciente)
            nextStep();
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

    useEffect(() => {
        if (pacienteId) {
            setStatusComponent(StatusComponent.LOADING);
            setIsEdit(true);
            getPaciente();
        }
    }, [pacienteId]);

    useEffect(() => {
        if (paciente) {
            const pacienteForm = createPacienteForm(paciente);
            form.reset(pacienteForm);
        }

        if (paciente && !pacienteId) {
            setIsUpdate(true);
        }

        setStatusComponent(StatusComponent.SUCCESS);

    }, [paciente, form]);
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const pacienteToSave = createPacienteToSave(values);

        if(isEdit) updatePacienteById(pacienteId, pacienteToSave);  
        else if(isUpdate) updatePacienteCreated(pacienteToSave);    
        else createNewPaciente(pacienteToSave);
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
                                        name="name"
                                        label="Nome"
                                        placeholder="José"
                                        description={text.descriptions.name}
                                    />
                                    <Field
                                        className="col-span-12 md:col-span-6"
                                        form={form}
                                        name="surname"
                                        label="Sobrenome"
                                        placeholder="da Silva"
                                        description={text.descriptions.surname}
                                    />
                                </div>
                                <FieldCPF
                                    className="col-span-12 sm:col-span-6"
                                    form={form}
                                    name="cpf"
                                    label="CPF"
                                    description={text.descriptions.cpf}
                                />
                                <div className={styles.formContent}>
                                    <Field
                                        className="col-span-12 sm:col-span-4 lg:col-span-2"
                                        form={form}
                                        typeInput="date"
                                        name="dateOfBirth"
                                        label="Data de nascimento"
                                        description={text.descriptions.dateOfBirth}
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
                                    Próximo
                                </Button>
                            </form>
                        </Form>
                    )}
                    <ErrorDialog
                        isOpen={dialogErrorForm}
                        setIsOpen={setDialogErrorForm}
                        descriptionText={descriptionErrorDialog}
                    />
                </FormControlBox>
            )}
        </Fragment>
    )
}