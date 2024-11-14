import { ListarExames } from "@/components/consultas/exames/listar";
import { Suspense } from "react";

import Loading from "@/app/loading";

export default function ExamesPage() {
    return (
        <Suspense fallback={<Loading />}>
            <ListarExames />
        </Suspense>
    )
}