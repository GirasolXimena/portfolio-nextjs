import React from 'react'
import { activeProjects } from '../../../lib/projects'
import Link from 'next/link'

export async function generateStaticParams() {
  return activeProjects.map((project) => ({
    proj: project.name
  }))
}

const ProjectLayout = ({
  children,
}: {
  children: React.ReactNode
}) => (
 <div className='repository-layout'>
    {children}
    <Link href='/labs'>All labs</Link>
 </div>
)

export default ProjectLayout