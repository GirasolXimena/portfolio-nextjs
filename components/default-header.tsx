import Navbar from "./navbar";
import ThemeSwitcher from "./theme-switcher";
import styles from '../styles/layout.module.scss'
import PaletteSwitcher from "./palette-switcher";

function DefaultHeader() {
  return (
      <header className={styles.header}>
        <Navbar theme='labs' />
        <PaletteSwitcher />
        <ThemeSwitcher />
      </header>
  )
}
export default DefaultHeader;
