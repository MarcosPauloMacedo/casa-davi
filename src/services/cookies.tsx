'use server'

import { cookies } from "next/headers"

const nameToken = 'auth-token'

const setToken = (token: string) => {
    cookies().set(nameToken, token)
}

const getToken = () => {
    return cookies().get(nameToken)
}

const removeToken = () => {
    cookies().delete(nameToken)
}

const setTheme = (theme: string) => {
    cookies().set('theme', theme)
}

const getTheme = () => {
    const themeCookie = cookies().get('theme');
    return themeCookie ? themeCookie.value : 'dark';
}

const promiseTheme = async () => {
    const themeCookie = cookies().get('theme');
    return themeCookie ? themeCookie.value : 'dark';
}

const altherTheme = async () => {
    if(cookies().has('theme')){
        const themeCookie = cookies().get('theme');
        const themeValue = themeCookie ? themeCookie.value : 'dark';
        const newTheme = themeValue === 'dark' ? 'light' : 'dark';
        cookies().set('theme', newTheme)
    } else {
        cookies().set('theme', 'light')
    }
}

const getCookies = async (name: string) => {
    const data = cookies().get(name)
    return data ? data.value : null
}

const setCookies = (name: string, value: any) => {
    cookies().set(name, value)
}

export { 
    setToken, 
    getToken, 
    removeToken, 
    setTheme, 
    getTheme, 
    altherTheme, 
    promiseTheme,
    getCookies,
    setCookies
}



