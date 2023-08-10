import styles from '../styles/hero.module.scss'
import Navbar from './navbar'
import { inter } from '../app/fonts'

export default function Hero() {
  const name = process.env.NAME || 'Katerina Solensan'
  const [first, last] = name.split(' ')
  const[firstLetter, ...rest] = first.split('')
  return (
    <div className={styles.hero}>
      <h1 id="name">
        {name && (
          <>
            <span className={`${inter.variable}`}>
              {firstLetter}
            </span>&nbsp;{rest}
            <br />
            {last}
          </>
        )}
      </h1>
      <Navbar segment='home' />
    </div>
  )
}