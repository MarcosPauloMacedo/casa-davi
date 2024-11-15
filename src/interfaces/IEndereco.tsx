export interface IEndereco {
    id: string,
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: number;
    pacienteId: string;
}

export type IEnderecoCreate = Omit<IEndereco, 'id'>;