'use client'
import "prismjs/themes/prism-tomorrow.css";
import styles from './exercise-detail.module.css'
import Link from 'next/link'
// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
function ExerciseDetailPage({ title, content, type, subtitle, prismName, github_link }) {
  const theme = 'tomorrow-night-eighties'
  if (type !== 'file') {
    return (
      <div>
        <h1>Not a file</h1>
      </div>
    )
  }
  const formattedTitle = title.split('.')[0].split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')
  return (
    <article className={styles.exercise}>
      <figure className={styles.content}>
        <pre className={`${styles.code} ${styles[theme]}`}>
          <code className={`language-${prismName}`} dangerouslySetInnerHTML={{ __html: content }} />
        </pre>
        <figcaption className={styles.description}>
          <h1 className={styles.title}>{formattedTitle}</h1>
          <Link className={styles.back} href='../'>&lt;-</Link>
          {/* <h2 className={styles.subtitle}>
            <Link href={`../`}>{subtitle}</Link>
          </h2> */}
        </figcaption>
      </figure>
    </article>
  )
}

export default ExerciseDetailPage