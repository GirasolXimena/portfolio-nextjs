import Link from 'next/link'
import styles from './title-bar.module.css'
import animation from '../../../styles/animation.module.scss'
const fileNametoTitle = (name: string) => name.split('.')[0].split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')

function TitleBar({ title, subtitle = '' }) {
  return (
    <div className={styles.head}>
      <Link className={animation.gradient} href={`/${subtitle}`}><h3>&lt;- {subtitle}</h3></Link>
      <h3>{fileNametoTitle(title)}</h3>
    </div>
  )
}

export default TitleBar