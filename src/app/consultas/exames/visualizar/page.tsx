import { Suspense } from "react";
import { VisualizarExame } from "@/components/consultas/exames/visualizar";

import Loading from "@/app/loading";

export default function VisualizarExamePage() {
    return (
        <Suspense fallback={<Loading />}>
            <VisualizarExame />
        </Suspense>
    )
}