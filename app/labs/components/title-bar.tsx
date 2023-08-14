import Link from 'next/link'
import styles from './title-bar.module.scss'
import animation from '../../../styles/animation.module.scss'
import { ReactNode } from 'react'
const fileNametoTitle = (name: string) => name.split('.')[0].split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')

function TitleBar({ title, subtitle = '', children }: { title: string, subtitle?: string, children?: ReactNode }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{fileNametoTitle(title)}</h1>
      {children}
        <Link
          href={`/${subtitle.toLowerCase()}`}
          className={`${styles.link}`}
        >
          &lt;- {subtitle}
        </Link>
    </div>
  )
}

export default TitleBar