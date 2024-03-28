import Image from "next/image";
import styles from "../../page.module.css";
import "../../style.css";
import BorrarContacto from "@/app/components/Borrarcontacto";

export default function Delete({params}) {
    return (
        <main className={styles.main}>
            <BorrarContacto id={params.id}/> 
        </main>
    );
}
