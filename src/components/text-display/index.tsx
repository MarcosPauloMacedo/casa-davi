import { Textarea } from '../ui/textarea';
import styles from './text-display.module.css'

interface TextDisplayProps {
    title: string;
    text: string;
}

export function TextDisplay({ title, text }: TextDisplayProps) {
    return (
        <p className={styles.textDisplay}>
            {title}
            <span className={styles.span}>{text}</span>
        </p>
    )
}

export function TextAreaDisplay({ title, text }: TextDisplayProps) {
    return (
        <div className={styles.textAreaDisplay}>
            <p>{title}</p>
            <Textarea 
                className={styles.textArea}
                title="Descrição: " 
                disabled={true} 
                value={text} 
            />
        </div>
    )
}