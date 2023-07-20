import React from 'react'
import Counter from './counter'
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
  {
    href: '/labs/c-programming-language',
    label: 'C Programming Language Exercises',
  }
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
      <Counter />
    </nav>
    {children}
 </div>
)

export default LabsLayout