import { FormularioVacina } from "@/components/consultas/vacinas/formulario";
import { Suspense } from "react";

import Loading from "@/app/loading";

export default function CadastrarVacina() {
    return (
        <Suspense fallback={<Loading />}>
            <FormularioVacina />
        </Suspense>
    )
}