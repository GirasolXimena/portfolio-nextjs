import Link from 'next/link'
import styles from '../styles/navbar.module.scss'
import utilStyles from '../styles/utils.module.scss'

export default function Navbar({ segment }) {

  return (
    <nav id="nav-bar" className={`${styles.nav} ${utilStyles[segment]} ${styles[segment]}`}>
      <ul>
        {segment !== 'home' && (
          <li className={styles.key}>
            <Link href="/">
                Home
            </Link>
          </li>
        )}
        <li className={styles.cyan}>
          <a href='assets/Andrade-Creative_Technologist.pdf' download="Andrade-Creative_Technologist.pdf">
            Resume
          </a>
        </li>
        <li className={styles.magenta}>
          <Link href="/labs">
              Labs
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