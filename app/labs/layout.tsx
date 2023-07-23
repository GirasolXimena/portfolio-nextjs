import React from 'react'
import Counter from './counter'
import { Metadata } from 'next'
import Navbar from '../../components/navbar'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}

const LabsLayout = ({ children }: { children: React.ReactNode }) => (
  <div style={{ margin: '1.5em' }}>
    <Navbar theme='labs' />
    <Counter />
    {children}
  </div>
)

export default LabsLayout