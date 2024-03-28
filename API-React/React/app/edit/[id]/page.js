import Image from "next/image";
import styles from "../../page.module.css";
import "../../style.css";
import EditarContacto from "@/app/components/Editarcontacto";

export default function Edit({params}) {
    return (
        <main className={styles.main}>
            <EditarContacto id={params.id}/>
        </main>
    );
}
