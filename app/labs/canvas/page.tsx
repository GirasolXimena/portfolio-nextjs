'use client'
// // import TitleBar from "./components/title-bar";
// import ListExercises from "./components/list-exercises";
import { useElementSize } from "usehooks-ts";

import Canvas from "components/canvas"
import { useRef } from "react";

let links = [
  {
    path: '/labs/eloquent-js-exercises',
    title: 'Eloquent JS Exercises',
    section: '📝'
  },
  {
    path: 'https://codepen.io/abstract_code',
    title: 'Codepen',
    section: '🔗'
  },
  {
    path: '/labs/c-programming-language',
    title: 'C Programming Language',
    section: '📝'
  }
]

export default function LabsIndexPage() {
  const [squareRef, { width: squareWidth, height: squareHeight }] = useElementSize()

  return (
    <div
    ref={squareRef}
    style={{
      backgroundColor: 'aliceblue',
      flexGrow: 1,
    
    }}
    >

      <Canvas
        fromx={0}
        fromy={0}
        tox={100}
        toy={100}
        headlen={10}
  
      ></Canvas>
    </div>

  )
}