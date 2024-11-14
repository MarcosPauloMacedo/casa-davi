import { ListarPacientes } from "@/components/pacientes/listar";
import { Suspense } from "react";

import Loading from "../loading";

export default function Pacientes() {
    return (
        <Suspense fallback={<Loading />}>
            <ListarPacientes />
        </Suspense>
    )
}