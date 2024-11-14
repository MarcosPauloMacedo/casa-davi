import { IPacienteCreate } from "@/interfaces/IPaciente";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/pacientes`;

export const createPaciente = async (paciente: IPacienteCreate) => {
    return await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paciente)
    });
}

export const getAllPacientes = async () => {
    return await fetch(`${API_URL}`);
}

export const getPacienteById = async (id: string) => {
    return await fetch(`${API_URL}/${id}`);
}

export const deletePaciente = async (id: string) => {
    return await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
}

export const updatePaciente = async (id: string, paciente: IPacienteCreate) => {
    return await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paciente)
    });
}

