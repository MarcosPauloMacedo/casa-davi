import { cn } from "@/lib/utils";

interface SubtitleProps{
    title: string;
    className?: string;
}

export function Subtitle({title, className}: SubtitleProps) {
    const styleDefault = 'dark:text-primary-dark text-primary-foreground text-center text-2xl font-semibold mb-12'

    return (
        <h2 className={cn(styleDefault,className)}>{title}</h2>
    )
}