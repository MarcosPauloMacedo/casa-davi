import { TextAreaDisplay, TextDisplay } from "@/components/text-display";
import { IPaciente } from "@/interfaces/IPaciente";
import { IVacina } from "@/interfaces/IVacina";

interface VisualizarVacinaDataProps {
    vacina: IVacina | undefined;
    paciente: IPaciente | undefined;
}

export function VisualizarVacinaData({ vacina, paciente }: VisualizarVacinaDataProps) {
    if(!vacina || !paciente) return;
    return (
        <div>
            <TextDisplay title="Nome da vacina: " text={vacina.name} />
            <TextDisplay title="Data da aplicação: " text={vacina.dataAplicacao} />
            <TextDisplay title="Tratamento: " text={vacina.tratamento} />
            <TextDisplay title="Paciente: " text={`${paciente.name} ${paciente.surname}`} />
            <TextAreaDisplay title="Observações: " text={vacina.observacao} />
        </div>
    )
}