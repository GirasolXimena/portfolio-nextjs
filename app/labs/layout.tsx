import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}

const links = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/labs',
    label: 'Labs',
  },
  {
    href: '/labs/eloquent-js',
    label: 'Eloquent JS Exercises',
  },
]

const LabsLayout = ({ children }: { children: React.ReactNode }) => (
 <div>
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

export default LabsLayout