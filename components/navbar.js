import styles from '../styles/navbar.module.scss'
import utilStyles from '../styles/utils.module.scss'

export default function Navbar({ theme }) {
  return (
    <nav id="nav-bar" className={`${styles.nav} ${utilStyles[theme]}`}>
      <ul>
        <li className={styles.cyan}>
          <a href='assets/Andrade-Creative_Technologist.pdf' download="Andrade-Creative_Technologist.pdf">
            Resume
          </a>
        </li>
        <li className={styles.magenta}>
          <a href="https://codepen.io/abstract_code/">
              Labs
          </a>
        </li>
        <li className={styles.yellow}>
          <a href='https://github.com/RobertAndradeJr'>
            Code
          </a>
        </li>
      </ul>
    </nav>
  )
}