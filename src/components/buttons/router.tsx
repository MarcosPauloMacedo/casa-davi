'use client'

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface ButtonRouterProps {
    src: string
}

export function ButtonRouter({ src }: ButtonRouterProps) {
    const router = useRouter()

    const handleRouter = () => {
        router.push(src)
    }

    return (
        <Button onClick={handleRouter}  variant="secondary">Voltar</Button>
    )
} 