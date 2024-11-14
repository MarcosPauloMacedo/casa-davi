'use client'

import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/16/solid";
import { Button } from "../ui/button";
import { removeToken } from "@/services/cookies";
import { useRouter } from "next/navigation";

import styles from './inicio.module.css';

export function InicioHeader() {
    const router = useRouter()

    const logout = () => {
        removeToken()
        router.push('/')
    }

    return (
        <header className={styles.header}>
            <Button className="primary-bg-text-dark" onClick={logout}>
                <ArrowLeftEndOnRectangleIcon className={styles.icon}/>
                Sair
            </Button>
        </header>
    )
}