import Link from "next/link";
import styles from "../styles/navbar.module.scss";
import utilStyles from "../styles/utils.module.scss";
import { CODEPEN_URL, GITHUB_URL, RESUME_URL } from "lib/data";

export default function Navbar({ segment }) {
  return (
    <nav
      id="nav-bar"
      className={`${styles.nav} ${utilStyles[segment]} ${styles[segment]}`}
    >
      <ul>
        {segment !== "home" && (
          <li className={styles.key}>
            <Link href="/">Home</Link>
          </li>
        )}
        <li className={styles.cyan}>
          <a href={RESUME_URL} download={RESUME_URL}>
            Resume
          </a>
        </li>
        <li className={styles.magenta}>
          <a href={CODEPEN_URL}>Labs</a>
        </li>
        <li className={styles.yellow}>
          <a href={GITHUB_URL}>Code</a>
        </li>
      </ul>
    </nav>
  );
}
