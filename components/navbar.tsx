import Link from 'next/link'
import styles from '../styles/navbar.module.scss'
import utilStyles from '../styles/utils.module.scss'
import { NAME } from 'lib/data'
import { useIsClient } from 'usehooks-ts'

export default function Navbar({ segment }) {
  const isClient = useIsClient()
  const variant = NAME.split(' ').join('-') 
  const url = isClient ? `assets/${variant}-resume.pdf` : ''
  return (
    <nav id="nav-bar" className={`${styles.nav} ${utilStyles[segment]} ${styles[segment]}`}>
      <ul>
        {/* {segment !== 'home' && (
          <li className={styles.key}>
            <Link href="/">
                Home
            </Link>
          </li>
        )} */}
        <li className={styles.cyan}>
          <a href={url} download={url}>
            Resume
          </a>
        </li>
        <li className={styles.magenta}>
          <a href="https://codepen.io/abstract_code">
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