import { TextAreaDisplay, TextDisplay } from "@/components/text-display";
import { IExame } from "@/interfaces/IExame";
import { IPaciente } from "@/interfaces/IPaciente";

interface VisualizarExameDataProps {
    exame: IExame | undefined;
    paciente: IPaciente | undefined;
}

export function VisualizarExameData({ exame, paciente }: VisualizarExameDataProps) {
    if (!exame || !paciente) return;
    return (
        <div>
            <TextDisplay title="Nome do exame: " text={exame.nome} />
            <TextDisplay title="Tratamento: " text={exame.tratamento} />
            <TextDisplay title="Data do exame: " text={exame.dataExame} />
            <TextDisplay title="Medicamento: " text={exame.medicacao} />
            <TextDisplay title="Paciente: " text={`${paciente.name} ${paciente.surname}`} />
            <TextAreaDisplay title="Relatório: " text={exame.relatorio} />
        </div>
    )
}