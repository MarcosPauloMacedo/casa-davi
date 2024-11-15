export interface IVacina {
    name: string;
    dataAplicacao: string;
    tratamento: string;
    observacao: string;
    pacienteId: string;
    id: string;
}

export type IVacinaCreate = Omit<IVacina, 'id'>;