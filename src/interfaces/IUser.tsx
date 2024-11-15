import { Status } from "@/utils/status-enum";

export interface IUser {
    id: string;
    name: string;
    username: string;
    password: string;
    email: string;
    status: keyof typeof Status;
}

export type IUserTable = Omit<IUser, 'status'> & { status: Status };

export type IUserForm = Omit<IUser, 'status'> & { status: boolean };

export type IUserCreate = Omit<IUser, 'id'>;

export type IUserPayload = Omit<IUser, 'password'>;

