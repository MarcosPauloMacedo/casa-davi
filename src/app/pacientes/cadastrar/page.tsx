import Loading from "@/app/loading";
import { FormularioPaciente } from "@/components/pacientes/formulario";
import { Suspense } from "react";

export default function CadastrarPaciente() {
    return (
        <Suspense fallback={<Loading />}>
            <FormularioPaciente />
        </Suspense>
    )
}