import { useEffect } from "react"
import styles from '../../styles/particle.module.scss';
import grayscale from "../../lib/filters/grayscale";

export default function Grayscale({ postData }) {
  useEffect(() => {
    const canvas = document.getElementById(styles.canvas1);
    const ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 450;

    const image1 = new Image();
    image1.src =
      'particle';
    image1.addEventListener('load', () => grayscale(canvas, image1))

    return () => {
      image1.removeEventListener('load', () => grayscale(canvas, image1))
    }
  }, [])
  return (
    <main className={styles.body}>
      <canvas id={styles.canvas1}>Particle Effect Test</canvas>

    </main>
  )
}