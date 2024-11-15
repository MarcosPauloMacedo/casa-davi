const API_URL = process.env.NEXT_PUBLIC_API_URL

export const logIn = async () => {
    return await fetch(`${API_URL}/login`);
}