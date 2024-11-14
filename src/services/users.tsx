import { IUserCreate } from "../interfaces/IUser";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/users`;

export const createUser = async (user: IUserCreate) => {
    return await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}

export const getAllUsers = async () => {
    return await fetch(`${API_URL}`);
}

export const getUserById = async (id: string) => {
    return await fetch(`${API_URL}/${id}`);
}

export const deleteUser = async (id: string) => {
    return await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
}

export const updateUser = async (id: string, user: IUserCreate) => {
    return await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}