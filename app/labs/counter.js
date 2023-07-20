'use client'
import { useState } from 'react'

// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
export default function HomePage() {
  const [timesClicked, setTimesClicked] = useState(0)
  return (
    <div>
      <h1>{'titl;e'}</h1>
      <button onClick={() => setTimesClicked(timesClicked + 1)}>times clicked: {timesClicked}</button>
    </div>
  )
}