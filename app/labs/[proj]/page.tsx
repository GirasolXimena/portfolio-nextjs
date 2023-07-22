// Import your Client Component
import ListExercises from '../components/list-exercises'
import { activeProjects } from '../../../lib/projects'

async function ProjectIndexPage({ params }: { params: { proj: string } }) {
  // Fetch data directly in a Server Component
  const currentProj = activeProjects.find(({ name }) => name === params.proj)
  const baseDir = currentProj?.baseDir || ''
  const getContent = currentProj?.content
  if (!getContent) throw new Error('no content function')
  const url = baseDir
  const chapters = (await getContent(url)).filter(({ name, type }) => !name.startsWith('.') && type === 'dir')
  const chapterContent = await Promise.all(chapters.map(async (chapter) => {
    const exercises = await getContent(`${baseDir ? `${baseDir}/` : ''}${chapter.name}`)
    return {
      chapter,
      exercises
    }
  }))

  // Forward fetched data to your Client Component
  return chapterContent.map(({ chapter, exercises }) =>
    <ListExercises key={chapter.name} title={chapter.name} baseDir={baseDir} project={params.proj} exercises={exercises} />)
}

export default ProjectIndexPage