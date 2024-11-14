interface FormControlProps {
    children: React.ReactNode;
}

import styles from './form.module.css'

export function FormControlBox({ children }: FormControlProps) {
    const bgFormTheme = 'bg-form-theme'
    return (
        <div className={`${styles.formControlBox} ${bgFormTheme}`}>
            {children}
        </div>
    )
}