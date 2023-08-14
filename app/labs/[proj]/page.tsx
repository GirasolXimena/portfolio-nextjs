// Import your Client Component
import ListExercises from '../components/list-exercises'
import { activeProjects } from '../../../lib/projects'
import TitleBar from '../components/title-bar'
import { fileNametoTitle, normalizePath } from '../../../lib/util/string'



async function ProjectIndexPage({ params }: { params: { proj: string } }) {
  const currentProj = activeProjects.find(({ name }) => name === params.proj)
  const baseDir = currentProj?.baseDir || ''
  const getContent = currentProj?.content
  const makeUrl = (path: string) => `${params.proj}/${normalizePath(path, baseDir)}`
  if (!getContent) throw new Error('no content function')
  const url = baseDir
  const chapters = (await getContent(url)).filter(({ name, type }) => !name.startsWith('.') && type === 'dir')
  const chapterContent = await Promise.all(chapters.map(async (chapter) => {
    const exercises = await getContent(`${baseDir ? `${baseDir}/` : ''}${chapter.name}`)
    return exercises.filter(({ type, name }) => type === 'file' && !name.endsWith('.txt')).map(exercise => ({
      section: `${chapter.name.slice(0, 2).toLocaleLowerCase()}. ${chapter.name.slice(-1)}`,
      title: fileNametoTitle(exercise.name),
      ...exercise,
      path: makeUrl(exercise.path),
    }))
  }))
  const flatList = chapterContent.flat()
  // Forward fetched data to your Client Component
  return (
    <TitleBar title={params.proj} subtitle='Labs'>
      <ListExercises items={flatList} />
    </TitleBar>
  )
}

export default ProjectIndexPage