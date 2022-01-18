import { useEffect } from "react"
import styles from '../../styles/particle.module.scss';
import particle from "../../lib/strings/particle";
import rain from "../../lib/filters/rain";

export default function Rain({ postData }) {
  useEffect(() => {
    const canvas = document.getElementById(styles.canvas1);
    const ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 450;

    const image1 = new Image();
    image1.src =
      particle;
    image1.addEventListener('load', () => rain(canvas, image1))

    return () => {
      console.log('vnvnn')
    }
  }, [])
  return (
    <main className={styles.body}>
      <canvas id={styles.canvas1}>Particle Effect Test</canvas>
    </main>
  )
}