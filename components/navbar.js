import Link from 'next/link'
import styles from '../styles/navbar.module.scss'

export default function Navbar() {
  return (
    <nav id="nav-bar" className={styles.nav}>
      <ul>
        <li className={styles.cyan}>
          <a href='assets/Andrade-Creative_Technologist.pdf' download="Andrade-Creative_Technologist.pdf">
            Resume
          </a>
        </li>
        <li className={styles.magenta}>
          <Link href="https://codepen.io/abstract_code/">
            <a>
              Labs
            </a>
          </Link>
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