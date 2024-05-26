'use client'
import { useSelectedLayoutSegment } from 'next/navigation'
import styles from '../styles/layout.module.scss'
import DefaultHeader from './default-header'
import HeaderControls from './header-controls';

function DefaultLayout({ children }) {
  const segment = useSelectedLayoutSegment() || ''
  return (
    <div className={styles.container}>
      <header className={styles.header} id="header">
        <DefaultHeader segment={segment} />
      </header>
      <main className={styles.content} id="main-content">
        {children}
      </main>
    </div>
  )
}

export default DefaultLayout