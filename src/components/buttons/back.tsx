'use client'

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ButtonBackProps {
    className?: string;
}

export function ButtonBack({ className }: ButtonBackProps) {
    const router = useRouter();

    return (
        <Button variant='secondary' className={cn(className)} 
        onClick={() => router.back()}>Voltar</Button>
    )
}