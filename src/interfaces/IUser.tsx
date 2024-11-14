import { Status } from "@/utils/status-enum";

export interface IUser {
    id: string;
    name: string;
    username: string;
    password: string;
    email: string;
    status: keyof typeof Status;
}

export interface IUserTable extends Omit<IUser, 'status'> {
    status: Status;
}

export interface IUserForm extends Omit<IUser, 'status'> {
    status: boolean;
}

export interface IUserCreate extends Omit<IUser, 'id'> {}

export interface IUserPayload extends Omit<IUser, 'password'> {}
