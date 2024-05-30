"use client";
import styles from "../styles/layout.module.scss";
import Navbar from "./navbar";

function DefaultLayout({ children }) {
  return (
    <div className={styles.container}>
      <header id="header">
        <Navbar segment={""} />
      </header>
      <main id="main-content" className={styles.content}>
        {children}
      </main>
    </div>
  );
}

export default DefaultLayout;
