'use client'
import Link from 'next/link'
import { normalizePath } from '../../../lib/util/string'

// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
export default function HomePage({ exercises, title, project, baseDir }) {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.path}>
            <Link href={`${project}/${normalizePath(exercise.path, baseDir)}`}>link to {exercise.name} {JSON.stringify(project, null, 2)} </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}