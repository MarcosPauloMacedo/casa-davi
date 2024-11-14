export interface IEndereco {
    id: string,
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: number;
    pacienteId: string;
}

export interface IEnderecoCreate extends Omit<IEndereco, 'id'> {}