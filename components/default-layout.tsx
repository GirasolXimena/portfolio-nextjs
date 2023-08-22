'use client'
import { useSelectedLayoutSegment } from 'next/navigation'
import styles from '../styles/layout.module.scss'
import DefaultHeader from './default-header'
import HeaderControls from './header-controls';
import BackgroundAnimation from './background-animation';

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
    <BackgroundAnimation className={styles.container}>
        <Header />
        <main className={styles.content} id="main-content">
          {children}
        </main>
    </BackgroundAnimation>
  )
}

export default DefaultLayout