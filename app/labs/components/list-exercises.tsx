"use client";
import Link from "next/link";
import styles from "./list-exercises.module.scss";
import animation from "styles/animation.module.scss";

type ListItems = {
  path: string;
  title: string;
  section: string;
}[];

// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
function ListItems({ items }: { items: ListItems }) {
  return (
    <div className={styles.container}>
      <ol className={styles.list}>
        {items.map(({ path, title, section }) => (
          <li key={path}>
            <Link
              href={path}
              className={`${styles.item} ${animation.gradient}`}
            >
              <span className={styles.name}>{title}</span>
              <span className={styles.section}>{section}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ListItems;
