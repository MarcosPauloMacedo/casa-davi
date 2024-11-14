import { LoginForm } from './form';
import { LoginImg } from "./login-img";

import styles from './login.module.css';

export function Login() {
    return (
        <div className={styles.login}>
            <div className={styles.boxCenter}>
                <section>
                    <LoginImg />
                </section>
                <section className={styles.sectionForm}>
                    <LoginForm />
                </section>
            </div>
        </div>
    )
}