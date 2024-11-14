'use client'

import { createVacina, getVacinaById, updateVacinaById } from "@/services/vacinas";
import { ErrorDialog } from "@/components/all-dialogs/error-dialog";
import { SuccessDialog } from "@/components/all-dialogs/success-dialog";
import { Field, FieldTextArea } from "@/components/form/fields";
import { FormControlBox } from "@/components/form/form-control-box";
import { LoadingCard } from "@/components/loading/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { StatusComponent } from "@/utils/status-component-enum";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { z } from "zod";
import { formSchema, useFormValues } from "./form-control-data";
import { formControlText as text } from "./form-control-text";
import { IVacina, IVacinaCreate } from "@/interfaces/IVacina";
import { IPaciente } from "@/interfaces/IPaciente";
import { getCookies } from "@/services/cookies";
import { getPacienteById } from "@/services/pacientes";
import { Subtitle } from "@/components/subtitle";

import styles from '../../../../form/form.module.css';

const createVacinaToSave = (values: any, pacienteId: string): IVacinaCreate => {
    return {
        ...values,
        pacienteId: pacienteId
    }
}

export function VacinaFormControl() {
    const vacinaId = useSearchParams().get('id') || '';

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

    const form = useFormValues();

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

    const findVacinaById = async (pacienteId: string) => {
        const response = await getVacinaById(pacienteId);
        
        if(response.ok) {
            const vacina: IVacina = await response.json();
            form.reset(vacina);

        } else {
            handleError()
        }
    }

    const updateVacina = async (vacinaId: string, vacinaTosave: IVacinaCreate) => {
        setStatusComponent(StatusComponent.LOADING);

        const response = await updateVacinaById(vacinaId, vacinaTosave);

        if(response.ok) {
            setDescriptionSuccessDialog(text.dialogs.editSuccess);
            setDialogSuccess(true);

        } else {
            setStatusComponent(StatusComponent.SUCCESS);
            setDescriptionErrorDialog(text.dialogs.editError);
            setDialogErrorForm(true);
        }
    }
    
    const createNewVacina = async (vacinaTosave: IVacinaCreate) => {
        setStatusComponent(StatusComponent.LOADING);

        const response = await createVacina(vacinaTosave);

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
        router.push(`/consultas/vacinas?paciente=${paciente?.id}`);
    }

    useEffect(() => {
        if (vacinaId) {
            setIsEdit(true);
            findVacinaById(vacinaId);
        }

        findPacienteIdByCookie();
        setStatusComponent(StatusComponent.SUCCESS);

    }, [vacinaId, form])
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if(!paciente) return;
        const vacina = createVacinaToSave(values, paciente.id);

        if(isEdit) updateVacina(vacinaId, vacina);      
        else createNewVacina(vacina);
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
                                    className="col-span-12 md:col-span-10"
                                    form={form}
                                    name="name"
                                    label="Nome"
                                    placeholder="Vacina H1N1"
                                    description={text.descriptions.name}
                                />
                                <Field
                                    className="col-span-12 md:col-span-2"
                                    form={form}
                                    name="dataAplicacao"
                                    label="Data da aplicação"
                                    typeInput="date"
                                    placeholder="dd/mm/aaaa"
                                    description={text.descriptions.dataAplicacao}
                                />
                            </div>
                            <Field
                                className="col-span-12"
                                form={form}
                                name="tratamento"
                                label="Tipo de tratamento"
                                description={text.descriptions.tipoTratamento}
                            />
                            <FieldTextArea
                                form={form}
                                name="observacao"
                                label="Observação"
                                description={text.descriptions.observacao}
                            />
                            <Button
                                className={styles.button}
                                variant="secondary" 
                                type="submit">
                                {isEdit ? 'Atualizar Vacina Aplicada' : 
                                'Criar Vacina Aplicada'}
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