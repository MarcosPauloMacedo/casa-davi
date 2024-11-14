import { IEnderecoCreate } from "@/interfaces/IEndereco";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/enderecos`;

export const getByPacientId = async (pacienteId: string) => {
    return await fetch(`${API_URL}?pacienteId=${pacienteId}`);
}

export const createEndereco = async ( enderecoToSave: IEnderecoCreate) => {
    return await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(enderecoToSave)
    });
}

export const updateByPacienteId = async (pacienteId: string, 
    enderecoToSave: IEnderecoCreate) => {

    return await fetch(`${API_URL}/paciente/${pacienteId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(enderecoToSave)
    });
}

