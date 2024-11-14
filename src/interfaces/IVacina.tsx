export interface IVacina {
    name: string;
    dataAplicacao: string;
    tratamento: string;
    observacao: string;
    pacienteId: string;
    id: string;
}

export interface IVacinaCreate extends Omit<IVacina, 'id'> {}