import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface AlertInfoProps {
    title: string;
    description: string;
}

export function AlertInfo({ title, description }: AlertInfoProps) {
    return (
        <Alert className="bg-card-theme my-4">
            <Terminal className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {description}
            </AlertDescription>
        </Alert>
    )
}