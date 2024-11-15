import { ILogin } from "@/interfaces/ILogin";

const API_URL = process.env.NEXT_PUBLIC_API_URL

// export const logIn = async (login: ILogin) => {
//     return await fetch(`${API_URL}/login`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(login)
//     });
// }

export const logIn = async (login: ILogin): Promise<Response> => {
    return await fetch(`${API_URL}/login`);
}