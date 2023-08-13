'use client'
import { useEffect, useState } from "react"
import styles from '@/styles/template.module.scss';

export default function Template({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
      setLoaded(true)
  }, [])

  return (
  <div className={`${styles.template} ${loaded ? styles.loaded : ''}`}>
    {children}
  </div>
  )
}