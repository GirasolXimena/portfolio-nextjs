"use client";
import { useMouseInput } from "hooks/useMouseInput";
import styles from "../styles/hero.module.scss";
import Navbar from "./navbar";
import { LampContainer } from "./ui/lamp";

export default function Hero({ name }: { name: string }) {
  useMouseInput();
  return (
    <LampContainer>
      <div className={styles.hero}>
        <h1 id="name">{name}</h1>

        <Navbar segment="home" />
      </div>
    </LampContainer>
  );
}
