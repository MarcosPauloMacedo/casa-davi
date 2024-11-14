import { Suspense } from "react";

import Loading from "@/app/loading";
import { ListarVacinas } from "@/components/consultas/vacinas/listar";

export default function VacinasPage() {
    return (
        <Suspense fallback={<Loading />}>
            <ListarVacinas />
        </Suspense>
    )
}