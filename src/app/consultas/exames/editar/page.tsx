import Loading from "@/app/loading"
import { FormularioExame } from "@/components/consultas/exames/formulario"
import { Suspense } from "react"

export default function EditarExamePage() {
    return (
        <Suspense fallback={<Loading />}>
            <FormularioExame />
        </Suspense>
    )
}