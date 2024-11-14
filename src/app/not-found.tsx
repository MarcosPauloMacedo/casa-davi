import { ButtonBack } from "@/components/buttons/back";

export default function NotFound() {
    return (
        <div className="bg-card h-screen flex 
            items-center justify-center gap-4 flex-wrap p-2">
            <h1>404 - Página não encontrada</h1>
            <ButtonBack className="bg-slate-400" />
        </div>
    )
}