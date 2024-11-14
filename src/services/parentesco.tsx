import { IParentesco } from "@/interfaces/IParentesco";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/parentesco`;

export const parentescoByPacientId = async (id: string) => {
    return await fetch(`${API_URL}?pacienteId=${id}`);
}

export const createParentesco = async (parentesco: IParentesco) => {
    return await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parentesco)
    });
}

export const updateByPacienteId = async (id: string, parentesco: IParentesco) => {
    return await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parentesco)
    });
}

