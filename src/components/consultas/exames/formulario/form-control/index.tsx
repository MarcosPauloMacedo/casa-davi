'use client'

import { IPaciente } from "@/interfaces/IPaciente";
import { StatusComponent } from "@/utils/status-component-enum";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { formSchema, formValues } from "./form-control-data";
import { formControlText as text } from "./form-control-text";
import { getCookies } from "@/services/cookies";
import { getPacienteById } from "@/services/pacientes";
import { createExame, getExameById, updateExameById } from "@/services/exames";
import { IExame, IExameCreate } from "@/interfaces/IExame";
import { z } from "zod";
import { FormControlBox } from "@/components/form/form-control-box";
import { LoadingCard } from "@/components/loading/card";
import { ErrorDialog } from "@/components/all-dialogs/error-dialog";
import { Subtitle } from "@/components/subtitle";
import { Form } from "@/components/ui/form";
import { Field, FieldTextArea } from "@/components/form/fields";
import { Button } from "@/components/ui/button";
import { SuccessDialog } from "@/components/all-dialogs/success-dialog";

import styles from '../../../../form/form.module.css';

const createExameToSave = (values: any, pacienteId: string): IExameCreate => {
    return {
        ...values,
        pacienteId: pacienteId
    }
}

export function ExameFormControl() {
    const exameId = useSearchParams().get('id') || '';

    const router = useRouter();

    const [paciente, setPaciente] = useState<IPaciente>();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [dialogSuccess, setDialogSuccess] = useState<boolean>(false);
    const [dialogNotFoundError, setDialogNotFoundError] = useState<boolean>(false);
    const [dialogErrorForm, setDialogErrorForm] = useState<boolean>(false);
    const [descriptionSuccessDialog, setDescriptionSuccessDialog] = useState<string>('');
    const [descriptionErrorDialog, setDescriptionErrorDialog] = useState<string>('');
    const [statusComponent, setStatusComponent] = useState<StatusComponent>
    (StatusComponent.LOADING);

    const form = formValues();

    const handleError = () => {
        setStatusComponent(StatusComponent.ERROR);
        setDescriptionErrorDialog(text.dialogs.error);
        setDialogNotFoundError(true)
    }

    const findPacienteIdByCookie = async () => {
        const pacienteId = await getCookies('paciente');
        
        if(pacienteId) {
            const response = await getPacienteById(pacienteId);

            if(response.ok) {
                const paciente: IPaciente = await response.json();
                setPaciente(paciente);
                
            } else {
                handleError()
            }
        }
    }

    const findExameById = async (id: string) => {
        const response = await getExameById(id);
        
        if(response.ok) {
            const exame: IExame = await response.json();
            form.reset(exame);

        } else {
            handleError()
        }
    }

    const updateExame = async (exameId: string, exameTosave: IExameCreate) => {
        setStatusComponent(StatusComponent.LOADING);

        const response = await updateExameById(exameId, exameTosave);

        if(response.ok) {
            setDescriptionSuccessDialog(text.dialogs.editSuccess);
            setDialogSuccess(true);

        } else {
            setStatusComponent(StatusComponent.SUCCESS);
            setDescriptionErrorDialog(text.dialogs.editError);
            setDialogErrorForm(true);
        }
    }
    
    const createNewexame = async (exameTosave: IExameCreate) => {
        setStatusComponent(StatusComponent.LOADING);

        const response = await createExame(exameTosave);

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
        router.push(`/consultas/exames?paciente=${paciente?.id}`);
    }

    useEffect(() => {
        if (exameId) {
            setIsEdit(true);
            findExameById(exameId);
        }

        findPacienteIdByCookie();
        setStatusComponent(StatusComponent.SUCCESS);

    }, [exameId, form])
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if(!paciente) return;
        const exame = createExameToSave(values, paciente.id);

        if(isEdit) updateExame(exameId, exame);      
        else createNewexame(exame);
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
                <Fragment>
                    <Subtitle 
                        className="text-start dark:text-primary-dark text-primary" 
                        title={`Paciente - ${paciente?.name}`}
                    />
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
                            <div className={styles.formContent}>
                                <Field
                                    className="col-span-12 md:col-span-5"
                                    form={form}
                                    name="nome"
                                    label="Nome"
                                    placeholder="nome do exame"
                                    description={text.descriptions.name}
                                />
                                <Field
                                    className="col-span-12 md:col-span-5"
                                    form={form}
                                    name="tratamento"
                                    label="Tratamento"
                                    placeholder="formas de tratamento"
                                    description={text.descriptions.tratamento}
                                />
                                <Field
                                    className="col-span-12 md:col-span-2"
                                    form={form}
                                    typeInput="date"
                                    name="dataExame"
                                    label="Data"
                                    description={text.descriptions.dataExame}
                                />
                            </div>
                            <Field
                                className="col-span-12"
                                form={form}
                                name="medicacao"
                                label="Medicação"
                                description={text.descriptions.medicacao}
                            />
                            <FieldTextArea
                                form={form}
                                name="relatorio"
                                label="Relatório"
                                description={text.descriptions.relatorio}
                            />
                            <Button
                                className={styles.button}
                                variant="secondary" 
                                type="submit">
                                {isEdit ? 'Atualizar exame Aplicada' : 
                                'Criar exame Aplicada'}
                            </Button>
                        </form>
                    </Form>
                </Fragment>
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