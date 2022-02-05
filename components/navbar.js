import Link from 'next/link'
import styles from '../styles/navbar.module.scss'

export default function Navbar({ home }) {
  return (
    <nav id="nav-bar" className={styles.nav}>
      <ul>
        <li className={styles.cyan}>
          <Link href={home ? '/resume' : '/'}>
            <a>
              {home ? 'Resume' : 'Home'}
            </a>
          </Link>
        </li>
        <li className={styles.magenta}>
          <Link href="https://codepen.io/abstract_code/">
            <a>
              Labs
            </a>
          </Link>
        </li>
        <li className={styles.yellow}>
          <Link href="/posts">
            <a>
              Blog
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}