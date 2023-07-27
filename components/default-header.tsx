import Navbar from "./navbar";
import ThemeSwitcher from "./theme-switcher";
import styles from '../styles/layout.module.scss'

function DefaultHeader() {
  return (
      <header className={styles.header}>
        <Navbar theme='labs' />
        <ThemeSwitcher />
      </header>
  )
}
export default DefaultHeader;
