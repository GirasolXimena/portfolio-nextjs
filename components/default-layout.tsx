'use client'
import { useSelectedLayoutSegment } from 'next/navigation'
import styles from '../styles/layout.module.scss'
import DefaultHeader from './default-header'
import HeaderControls from './header-controls';

function DefaultLayout({ children }) {
  const segment = useSelectedLayoutSegment();
  function Header() {
    return segment ? (
      <header className={styles.header} id="header">
        <DefaultHeader />
      </header>
    ) : (
      <HeaderControls segment={'home'} />
    )

  }
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.content} id="main-content">
        {children}
      </main>
    </div>
  )
}

export default DefaultLayout