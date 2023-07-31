import Navbar from "./navbar";
import styles from '../styles/layout.module.scss'
import HeaderControls from "./header-controls";

function DefaultHeader() {
  return (
    <header className={styles.header}>
      <Navbar theme='labs' />
      <HeaderControls />
    </header>
  )
}
export default DefaultHeader;
