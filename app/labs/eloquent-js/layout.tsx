import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'



const EloquentJSLayout = ({ children }: { children: React.ReactNode }) => (
 <div className='eloquent-js'>
    {children}
 </div>
)

export default EloquentJSLayout