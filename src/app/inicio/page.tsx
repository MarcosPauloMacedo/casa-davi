import { Inicio } from "@/components/inicio";
import { Suspense } from "react";

import Loading from "../loading";

export default function InicioPage() {
    return (
        <Suspense fallback={<Loading />}>
            <Inicio />
        </Suspense>
    )
}