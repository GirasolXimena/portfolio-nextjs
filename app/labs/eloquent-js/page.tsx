// Import your Client Component
import ListExercises from '../components/list-exercises'
import { eloquentJSContent } from '../../../api/github'

export default async function EloquentJSIndexPage() {
  // Fetch data directly in a Server Component
  const chapters = (await eloquentJSContent('src')).filter(({ name, type }) => !name.startsWith('.') && type === 'dir')
  const chapterContent = await Promise.all(chapters.map(async (chapter) => {
    const exercises = await eloquentJSContent(`src/${chapter.name}`)
    return {
      chapter,
      exercises
    }
  }))
  // Forward fetched data to your Client Component
  return chapterContent.map(({ chapter, exercises }) =>
    <ListExercises project={'eloquent-js'} key={chapter.name} title={chapter.name} exercises={exercises} />)
}