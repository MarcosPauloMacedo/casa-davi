import { VisualizarPaciente } from "@/components/pacientes/visualizar";
import { Suspense } from "react";

import Loading from "@/app/loading";

export default function VisualizarPacientePage() {
    return (
        <Suspense fallback={<Loading />}>
            <VisualizarPaciente />
        </Suspense>
    )
}