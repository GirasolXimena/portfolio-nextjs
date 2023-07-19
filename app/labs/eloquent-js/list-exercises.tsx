'use client'
import Link from 'next/link'

// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
export default function HomePage({ exercises, title }) {
  return (
    <div>
      <h1>{title}</h1>
      <ul>
        {exercises.map((post) => (
          <li key={post.path}>
            <Link href={`eloquent-js/${post.name}`}>link to {post.name} </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}