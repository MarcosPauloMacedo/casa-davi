import { VisualizarUsuario } from "@/components/usuarios/visualizar";
import { Suspense } from "react";

import Loading from "@/app/loading";

export default function VisualizarUsuarioPage() {
    return (
        <Suspense fallback={<Loading />}>
            <VisualizarUsuario />
        </Suspense>
    )
}