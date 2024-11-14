'use client'

import { AlertInfo } from "@/components/alerts/alert-info";
import { SwipeSimple } from "@/components/slides/swipe-simple";
import { Button } from "@/components/ui/button";
import { IPaciente } from "@/interfaces/IPaciente";
import { getPacienteById } from "@/services/pacientes";
import { useEffect, useState } from "react";
import { panelText as text } from "./panel-text";

import styles from './panel.module.css';

interface PanelProps {
    previousStep: () => void;
    pacienteId: string | undefined;
}

export function Panel({ previousStep, pacienteId }: PanelProps) {
    const [paciente, setPaciente] = useState<IPaciente>();

    const findPacientById = async () => {
        if(!pacienteId) return;
        const response = await getPacienteById(pacienteId);

        if (response.ok) {
            const paciente: IPaciente = await response.json();
            setPaciente(paciente);
        }
    }

    const routesSwipeSimples = [
        { title: 'Exames médicos', href: `/consultas/exames?paciente=${pacienteId}` },
        { title: 'Vacinas', href: `/consultas/vacinas?paciente=${pacienteId}` },
    ]

    useEffect(() => {
        findPacientById();
    }, [pacienteId]);

    return (
        <div>
            <AlertInfo 
                title={text.alertInfo.title(paciente?.name)}
                description={text.alertInfo.description(paciente?.name)}
            />
            <div className={styles.containerSwipeButton}>
                <SwipeSimple routes={routesSwipeSimples} />
                <Button 
                    className={styles.button}
                    onClick={previousStep} 
                    variant='secondary'>Voltar etapa inicial
                </Button>
            </div>
        </div>
    )
}