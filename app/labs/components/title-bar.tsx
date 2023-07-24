import Link from 'next/link'
import styles from './title-bar.module.css'
const fileNametoTitle = (name: string) => name.split('.')[0].split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')

function TitleBar({ title, subtitle = '' }) {
  return (
    <div className={styles.head}>
      <h3><Link href={`/${subtitle}`}>&lt;- {subtitle}</Link></h3>
      <h3>{fileNametoTitle(title)}</h3>
    </div>
  )
}

export default TitleBar