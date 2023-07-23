'use client'
import Link from 'next/link'
import styles from './list-exercises.module.css'
import { normalizePath, getExtension } from '../../../lib/util/string'

// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
export default function HomePage({ exercises, project, baseDir }) {
  const makeUrl = (path: string) => `${project}/${normalizePath(path, baseDir)}`
  const fileNametoTitle = (name: string) => name.split('.')[0].split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')
  return (
    <div className={styles.exercises}>
      <div className={styles.head}>
        
        <h3><Link href='/labs'>&lt;-</Link></h3>
        <h3>{fileNametoTitle(project)}</h3>
      </div>
      <ol className={styles.list}>
        {exercises.map((exercise) => (
          <li key={exercise.path}>
            <Link href={makeUrl(exercise.path)} className={styles.item}>
              <span className={styles.name} >
                {fileNametoTitle(exercise.name)}
              </span>
              <span className={styles.dir}>
                {fileNametoTitle(exercise.chapter)}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}