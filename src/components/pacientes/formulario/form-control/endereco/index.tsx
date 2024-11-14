'use client'

import { ErrorDialog } from '@/components/all-dialogs/error-dialog'
import { Field } from '@/components/form/fields'
import { FormControlBox } from '@/components/form/form-control-box'
import { LoadingCard } from '@/components/loading/card'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { IEndereco, IEnderecoCreate } from '@/interfaces/IEndereco'
import { IPaciente } from '@/interfaces/IPaciente'
import { createEndereco, getByPacientId, updateByPacienteId } from '@/services/enderecos'
import { StatusComponent } from '@/utils/status-component-enum'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { z } from 'zod'
import { formSchema, useFormValues } from './form-control-data'
import { formControlText as text } from './form-control-text'

import styles from '../../../../form/form.module.css'

interface formEnderecoProps {
    paciente: IPaciente | undefined;
    endereco: IEndereco | undefined;
    setEndereco: (endereco: IEndereco) => void;
    previusStep: () => void;
    nextStep: () => void;
}

const createEnderecoToSave = (enderecoToSave: z.infer<typeof formSchema>, pacienteId: string): IEnderecoCreate => {
    return {
        ...enderecoToSave,
        pacienteId: pacienteId
    }
}

export function FormEndereco({ paciente, previusStep, nextStep, endereco, setEndereco }: 
    formEnderecoProps) {

    const router = useRouter();

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [addressAlreadySaved, setAddressAlreadySaved] = useState<boolean>(false);
    const [statusComponent, setStatusComponent] = useState<StatusComponent>(StatusComponent.LOADING);
    const [dialogNotFoundError, setDialogNotFoundError] = useState<boolean>(false);
    const [dialogErrorForm, setDialogErrorForm] = useState<boolean>(false);
    const [descriptionErrorDialog, setDescriptionErrorDialog] = useState<string>('');

    const form = useFormValues();

    const previus = () => {
        const endereco = form.getValues() as IEndereco;
        setEndereco(endereco);
        previusStep();
    }

    const handleError = () => {
        setStatusComponent(StatusComponent.ERROR);
        setDescriptionErrorDialog(text.dialogs.error);
        setDialogNotFoundError(true)
    }

    const getEnderecoByPacienteId = async (pacienteId: string) => {
        const response = await getByPacientId(pacienteId);

        if(response.ok) {
            const endereco = await response.json();
            
            if(endereco.length) {
                setAddressAlreadySaved(true);
                setEndereco(endereco[0]);
            }

        } else {
            handleError()
        }
    }

    const updateEnderecoByPacienteId = async (pacienteId: string, enderecoToSave: IEnderecoCreate) => {
        setStatusComponent(StatusComponent.LOADING);

        const response = await updateByPacienteId(pacienteId, enderecoToSave);

        if(response.ok) {
            nextStep();
        } else {
            setStatusComponent(StatusComponent.SUCCESS);
            setDescriptionErrorDialog(text.dialogs.editError);
            setDialogErrorForm(true);
        }
    }
    
    const createNewEndereco = async (enderecoToSave: IEnderecoCreate) => {
        setStatusComponent(StatusComponent.LOADING);

        const response = await createEndereco(enderecoToSave);

        if(response.ok) {
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
        if (paciente && !endereco) {
            getEnderecoByPacienteId(paciente.id)
        }

    }, [paciente, form])

    useEffect(() => {
        if (endereco && addressAlreadySaved) {
            form.reset(endereco);
            setIsEdit(true);
        }

        if (endereco && !addressAlreadySaved) {
            form.reset(endereco);
        }

        setStatusComponent(StatusComponent.SUCCESS);

    }, [endereco])
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if(!paciente) return;
        
        const endereco = createEnderecoToSave(values, paciente.id);

        if(isEdit) updateEnderecoByPacienteId(paciente.id, endereco);     
        else createNewEndereco(endereco)
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
                                        name="estado"
                                        label="Estado"
                                        placeholder="Estado: SP, MG..."
                                        description={text.descriptions.estado}
                                    />
                                    <Field
                                        className="col-span-12 md:col-span-6"
                                        form={form}
                                        name="cidade"
                                        label="Cidade"
                                        placeholder="digite o nome da cidade"
                                        description={text.descriptions.cidade}
                                    />
                                </div>
                                <div className={styles.formContent}>
                                    <Field
                                        className="col-span-12 sm:col-span-5"
                                        form={form}
                                        name="bairro"
                                        label="Bairro"
                                        description={text.descriptions.bairro}
                                    />
                                    <Field
                                        className="col-span-12 sm:col-span-5"
                                        form={form}
                                        name="rua"
                                        label="Rua"
                                        description={text.descriptions.rua}
                                    />
                                    <Field
                                        className="col-span-12 sm:col-span-2"
                                        form={form}
                                        typeInput="number"
                                        name="numero"
                                        label="Número"
                                        description={text.descriptions.numero}
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
                                        onClick={() => nextStep()}
                                        className={styles.button}
                                        variant="secondary">
                                        Próximo
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
                </FormControlBox>
            )}
        </Fragment>
    )
}