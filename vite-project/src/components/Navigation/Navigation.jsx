import { Link } from "react-router-dom"
import styles from "./Navigation.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { faGear } from "@fortawesome/free-solid-svg-icons"

export function Navigation(){
    return(
        <>
         <header className={styles.header}>
            <nav className={styles.nav}>
                <FontAwesomeIcon icon={faSquarePlus} /><Link to="/addcard" className={styles.link}>Add card </Link>
                <FontAwesomeIcon icon={faHouse} /><Link to="/" className={styles.link}>Home</Link>
                <FontAwesomeIcon icon={faGear} /><Link to="/settings" className={styles.link}>Settings</Link>
            </nav>
        </header>
        </>
    )
}