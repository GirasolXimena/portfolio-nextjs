import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'



const EloquentJSLayout = ({ children }: { children: React.ReactNode }) => (
 <div className='eloquent-js'>
  <h1>shared layout my guy</h1>
    {children}
 </div>
)

export default EloquentJSLayout