import { Status } from "@/utils/status-enum";

export interface IPaciente {
    id: string;
    name: string;
    surname: string;
    cpf: string;
    dateOfBirth: string;
    status: keyof typeof Status;
}

export type IPacienteTable = Omit<IPaciente, 'status'> & { status: Status };

export type IPacienteForm = Omit<IPaciente, 'status'> & { status: boolean };

export type IPacienteCreate = Omit<IPaciente, 'id'>;
