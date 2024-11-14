import { Status } from "@/utils/status-enum";

export interface IPaciente {
    id: string;
    name: string;
    surname: string;
    cpf: string;
    dateOfBirth: string;
    status: keyof typeof Status;
}

export interface IPacienteTable extends Omit<IPaciente, 'status'> {
    status: Status;
}

export interface IPacienteForm extends Omit<IPaciente, 'status'> {
    status: boolean;
}

export interface IPacienteCreate extends Omit<IPaciente, 'id'> {}
