import React from 'react'
import { activeProjects } from '../../../lib/projects'

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
 </div>
)

export default ProjectLayout