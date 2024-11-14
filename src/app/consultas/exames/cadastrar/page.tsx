import { FormularioExame } from "@/components/consultas/exames/formulario";
import { Suspense } from "react";

import Loading from "@/app/loading";

export default function CadastrarExamesPage() {
    return (
        <Suspense fallback={<Loading />}>
            <FormularioExame />
        </Suspense>
    )
}