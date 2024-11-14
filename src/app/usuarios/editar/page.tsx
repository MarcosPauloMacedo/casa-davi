import { FormularioUsuario } from "@/components/usuarios/formulario";
import { Suspense } from "react";

import Loading from "@/app/loading";

export default function EditarUsuarioPage() {
    return (
        <Suspense fallback={<Loading />}>
            <FormularioUsuario />
        </Suspense>
    )
}