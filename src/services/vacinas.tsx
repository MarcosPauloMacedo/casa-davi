import { IVacinaCreate } from "@/interfaces/IVacina";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/vacinas`;

export const createVacina = async (vacina: IVacinaCreate) => {
    return await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vacina)
    });
}

export const getVacinaById = async (id: string) => {
    return await fetch(`${API_URL}/${id}`);
}

export const getVacinasByPacienteId = async (pacienteId: string) => {
    return await fetch(`${API_URL}?pacienteId=${pacienteId}`);
}

export const deleteVacina = async (id: string) => {
    return await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
}

export const updateVacinaById = async (vacinaId: string, vacina: IVacinaCreate) => {
    return await fetch(`${API_URL}/${vacinaId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vacina)
    });
}

