import { ListarUsuarios } from "@/components/usuarios/listar";
import { Suspense } from "react";

import Loading from "../loading";

export default function Usuarios() {
    return (
        <Suspense fallback={<Loading />}>
            <ListarUsuarios />
        </Suspense>
    )
}