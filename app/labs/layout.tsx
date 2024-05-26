import React from "react";
import { Metadata } from "next";
import styles from "styles/layout.module.scss";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

const LabsLayout = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.labs}>{children}</div>
);

export default LabsLayout;
