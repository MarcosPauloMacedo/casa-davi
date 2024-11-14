import { Login } from "@/components/login";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Login />
    </Suspense>
  )
}
