import React from 'react'
import Link from 'next/link'

const ExerciseLayout = ({ children, project }: { children: React.ReactNode, project: string }) => (
 <div className='eloquent-exercise'>
    <nav>
      <ul>
        <li>
          <Link href={`/labs/${project}`}>Back to exercises</Link>
        </li>
      </ul>
    </nav>
    {children}
 </div>
)

export default ExerciseLayout