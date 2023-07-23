'use client'
import "prismjs/themes/prism-tomorrow.css";
import styles from './exercise.module.css'
import Link from 'next/link'
// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
function ExerciseDetailPage({ title, content, github_link, type, subtitle, prismName }) {
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
      <h1 className={styles.title}>{formattedTitle}</h1>
      
      <h2 className={styles.subtitle}>
        <Link href={`../`}>{subtitle}</Link>
      </h2>
      <figure className={styles.content}>
        <pre className={`${styles.code} ${styles[theme]}`}>
          <code className={`language-${prismName}`} dangerouslySetInnerHTML={{ __html: content }} />
        </pre>
        <figcaption className={styles['see-more']}>
            <span className="language">
              {prismName}
            </span>
            <span className="link">
              View on <a href={github_link}>Github</a>
            </span>
        </figcaption>
      </figure>
    </article>
  )
}

export default ExerciseDetailPage