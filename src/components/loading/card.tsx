import { Skeleton } from "../ui/skeleton";

export function LoadingCard() {
    return (
        <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-full rounded-xl bg-card" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-card" />
                <Skeleton className="h-4 w-[200px] bg-card" />
            </div>
        </div>
    )
}