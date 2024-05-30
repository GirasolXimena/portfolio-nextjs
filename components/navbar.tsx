import Link from "next/link";
import styles from "../styles/navbar.module.scss";
import utilStyles from "../styles/utils.module.scss";
import { NAME } from "lib/data";
import { useIsClient } from "usehooks-ts";
import clsx from "clsx";
import HeaderControls from "./header-controls";

export default function Navbar({ segment }) {
  const isClient = useIsClient();
  const variant = NAME.split(" ").join("-");
  const url = isClient ? `assets/${variant}-resume.pdf` : "";
  return (
    <nav
      id="nav-bar"
      className={clsx(styles.nav, utilStyles[segment], styles[segment], 'navbar grow w-full bg-blue-300')}
    >
      <ul>
        {segment !== "home" && (
          <li className={styles.key}>
            <Link href="/">Home</Link>
          </li>
        )}
        <li className={clsx(styles.cyan, 'btn')}>
          <a className="btn" href={url} download={url}>
            Resume
          </a>
        </li>
        <li className={clsx(styles.magenta, 'btn btn-primary')}>
          <a className="btn btn-secondary" href="https://codepen.io/abstract_code">Labs</a>
        </li>
        <li className={styles.yellow}>
          <a href="https://github.com/RobertAndradeJr">Code</a>
        </li>
        <li className="navbar-end">
          <HeaderControls segment={segment} />

        </li>
      </ul>
    </nav>
  );
}
