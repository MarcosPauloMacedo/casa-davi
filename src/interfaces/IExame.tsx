export interface IExame {
    nome: string;
    tratamento: string;
    dataExame: string;
    medicacao: string;
    relatorio: string;
    pacienteId: string;
    id: string;
}

export interface IExameCreate extends Omit<IExame, 'id'> {}