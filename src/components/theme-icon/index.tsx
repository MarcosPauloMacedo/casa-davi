'use client'

import { ITheme } from "@/interfaces/ITheme";
import { cn } from "@/lib/utils";
import { altherTheme, promiseTheme } from "@/services/cookies";
import { ArrowPathIcon, MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { useEffect,  useState } from "react";

interface ThemeIconProps {
    className?: string
}

export function ThemeIcon({ className }: ThemeIconProps) {
    const [currentIcon, setCurrentIcon] = useState<keyof ITheme>()
    const styleIcon = 'w-6 h-6 text-primary-foreground dark:text-primary cursor-pointer'

    const findTheme = async () => {
        const theme = await promiseTheme() as keyof ITheme
        if(currentIcon !== theme) setCurrentIcon(theme)
    }

    const handleClick = async () => {
        await altherTheme()
        findTheme()
    }

    const icons = {
        dark: <SunIcon onClick={handleClick} className={styleIcon} />,
        light: <MoonIcon onClick={handleClick} className={styleIcon} />,
        none: <ArrowPathIcon onClick={handleClick} className={styleIcon} />
    }

    useEffect(() => {
        findTheme()
    }, [])

    return (
        <div className={cn('py-2 px-1 rounded bg-card dark:bg-background', className)}>
            {currentIcon && icons[currentIcon] || icons.none}
        </div>
    )
}