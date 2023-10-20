import { add } from "../../utils"
import styles from "./index.module.scss"

export function Header(){
    return <div className={styles.header}>Header {add(1, 2)}</div>
}