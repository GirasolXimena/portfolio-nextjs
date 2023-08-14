'use client'
import "prismjs/themes/prism-tomorrow.css";
import styles from './exercise-detail.module.scss'
import animation from '@/styles/animation.module.scss'
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
      <figcaption className={styles.description}>
        <h1 className={styles.title}>{formattedTitle}</h1>
      </figcaption>
      <figure className={styles.content}>
        <pre className={`${styles.code} ${styles[theme]}`}>
          <code className={`language-${prismName}`} dangerouslySetInnerHTML={{ __html: content }} />
        </pre>
      </figure>
      <Link className={`${styles.back} ${animation.gradient}`} href='../'>&lt;-</Link>
    </article>
  )
}

export default ExerciseDetailPage