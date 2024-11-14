import { IPaciente } from '@/interfaces/IPaciente';
import { Status } from '@/utils/status-enum';
import { TextDisplay } from '@/components/text-display';
import { PageViewData } from '@/components/page-view/page-view-data';
import { Fragment } from 'react';
import { Subtitle } from '@/components/subtitle';

interface VisualizarDataProps {
    paciente: IPaciente;
}

export function VisualizarData({ paciente }: VisualizarDataProps) {
    return (
        <PageViewData>
            <Fragment>
                <Subtitle title={paciente.name} />
                <TextDisplay title="Nome: " text={paciente.name} />
                <TextDisplay title='Sobrenome: ' text={paciente.surname} />
                <TextDisplay title='Data de Nascimento: ' text={paciente.dateOfBirth} />
                <TextDisplay title='CPF: ' text={paciente.cpf} />
                <TextDisplay title='Status: ' text={Status[paciente.status]} />
            </Fragment>
        </PageViewData> 
    )
}