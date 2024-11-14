import { IExameCreate } from "@/interfaces/IExame";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/exames`;

export const createExame = async (exame: IExameCreate) => {
    return await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exame)
    });
}

export const getExameById = async (id: string) => {
    return await fetch(`${API_URL}/${id}`);
}

export const getExamesByPacienteId = async (pacienteId: string) => {
    return await fetch(`${API_URL}?pacienteId=${pacienteId}`);
}

export const deleteExame = async (id: string) => {
    return await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
}

export const updateExameById = async (exameId: string, exame: IExameCreate) => {
    return await fetch(`${API_URL}/${exameId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exame)
    });
}

