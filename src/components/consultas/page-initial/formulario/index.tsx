'use client'

import { FieldSelect } from "@/components/form/fields";
import { Form } from "@/components/ui/form";
import { formSchema, useFormValues } from "./form-control-data";
import { formControlText as text } from "./form-control-text";
import { IPaciente } from "@/interfaces/IPaciente";
import { useEffect, useState } from "react";
import { getAllPacientes } from "@/services/pacientes";
import { ISelectItem } from "@/interfaces/ISelectItem";
import { Button } from "@/components/ui/button";
import { z } from "zod";

import stylesForm from '../../../form/form.module.css';
import styles from './form.module.css';

const createSelectItems = (pacientes: IPaciente[]): ISelectItem[] => {
    return pacientes.map(paciente => ({
        value: paciente.id,
        name: paciente.name
    }));
}

interface IPageInitialFormProps {
    setPacienteId: (pacientId: string) => void;
    nextStep: () => void;
}

export function PageInitialForm({ setPacienteId, nextStep }: IPageInitialFormProps) {
    const form = useFormValues();

    const [selectItems, setSelectItems] = useState<ISelectItem[]>([]);

    const findPacientes = async () => {
        const response = await getAllPacientes();

        if (response.ok) {
            const pacientes: IPaciente[] = await response.json();
            const selectItems = createSelectItems(pacientes);

            setSelectItems(selectItems);
        }
    }

    useEffect(() => {
        findPacientes();
    }, [selectItems]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setPacienteId(values.pacientId);
        nextStep();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className={`${stylesForm.formContent} items-center`}>
                    <FieldSelect
                        className={styles.fieldSelect}
                        form={form}
                        name="pacientId"
                        label={text.select.label}
                        placeholder={text.select.placeholder}
                        description={text.select.description}
                        selectItems={selectItems}
                    />
                    <Button 
                        className={styles.button} 
                        variant="secondary" 
                        type="submit">Próximo
                    </Button>
                </div>
            </form>
        </Form>
    )
}