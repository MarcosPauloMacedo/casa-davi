import { PageInitial } from "@/components/consultas/page-initial";
import { Suspense } from "react";

import Loading from "../loading";

export default function ConsultasPage() {
    return (
        <Suspense fallback={<Loading />}>
            <PageInitial />
        </Suspense>
    )
}