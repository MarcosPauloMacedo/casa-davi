import { Suspense } from "react";
import { VisualizarVacina } from "@/components/consultas/vacinas/visualizar";

import Loading from "@/app/loading";

export default function VisualizarVacinaPage() {
    return (
        <Suspense fallback={<Loading />}>
            <VisualizarVacina />
        </Suspense>
    )
}