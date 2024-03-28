import styles from "../page.module.css";
import "../style.css";
import AgregarContacto from "../components/Agregarcontacto";

export default function Add() {
    return (
        <main className={styles.main}>
            <AgregarContacto/>
        </main>
    );
}
