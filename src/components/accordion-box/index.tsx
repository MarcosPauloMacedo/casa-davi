import { 
    AccordionContent, 
    AccordionItem, 
    AccordionTrigger 
} from "@/components/ui/accordion";

interface AccordionBoxProps {
    value: string;
    title: string;
    children: React.ReactNode;
}

export function AccordionBox({ value, title, children }: AccordionBoxProps) {
    return (
        <AccordionItem value={value}>
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent>
                {children}
            </AccordionContent>
        </AccordionItem>
    )
}