import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

const links = [
  {
    href: '/labs/eloquent-js',
    label: 'Back to exercises',
  },
]

const ExerciseLayout = ({ children }: { children: React.ReactNode }) => (
 <div className='eloquent-exercise'>
    <nav>
      <ul>
        {
          links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))
        }
      </ul>
    </nav>
    {children}
 </div>
)

export default ExerciseLayout