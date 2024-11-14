'use client'

import { Fragment, useEffect, useState } from "react";
import { FormEndereco } from "./endereco";
import { FormPaciente } from "./paciente";
import { IPaciente } from "@/interfaces/IPaciente";
import { IEndereco } from "@/interfaces/IEndereco";
import { FormParentesco } from "./parentesco";
import { IParentesco } from "@/interfaces/IParentesco";

export function PacienteFormControl() {
    const [paciente, setPaciente] = useState<IPaciente>();
    const [endereco, setEndereco] = useState<IEndereco>();
    const [parentesco, setParentesco] = useState<IParentesco>();
    const [stepFormPacient, setStepFormPacient] = useState<boolean>(true);
    const [stepFormEndereco, setStepFormEndereco] = useState<boolean>(false);
    const [stepFormParentesco, setStepFormParentesco] = useState<boolean>(false);

    useEffect(() => {
        if (stepFormPacient) {
            setStepFormEndereco(false);
        }
    }, [stepFormPacient]);

    useEffect(() => {
        if (stepFormEndereco) {
            setStepFormPacient(false);
            setStepFormParentesco(false);
        }
    }, [stepFormEndereco]);

    useEffect(() => {
        if (stepFormParentesco) {
            setStepFormEndereco(false);
        }
    }, [stepFormParentesco]);

    return (
        <Fragment>
            {stepFormPacient && (
                <FormPaciente 
                    setPaciente={setPaciente} 
                    paciente={paciente}
                    nextStep={() => setStepFormEndereco(true)}
                />
            )}
            {stepFormEndereco && (
                <FormEndereco 
                    paciente={paciente} 
                    endereco={endereco}
                    setEndereco={setEndereco}
                    previusStep={() => setStepFormPacient(true)}
                    nextStep={() => setStepFormParentesco(true)}
                />
            )}
            {stepFormParentesco && (
                <FormParentesco
                    paciente={paciente}
                    parentesco={parentesco}
                    setParentesco={setParentesco}
                    previusStep={() => setStepFormEndereco(true)}
                />
            )}
        </Fragment>
    )
}