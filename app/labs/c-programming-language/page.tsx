// Import your Client Component
import ListExercises from '../components/list-exercises'
import { cProgrammingLanguageContent } from '../../../api/github'
export default async function CProgrammingLanguageIndexPage() {
  // Fetch data directly in a Server Component
  const chapters = (await cProgrammingLanguageContent('')).filter(({ name, type }) => !name.startsWith('.') && type === 'dir')
  const chapterContent = await Promise.all(chapters.map(async (chapter) => {
    const exercises = await cProgrammingLanguageContent(chapter.name)
    return {
      chapter,
      exercises
    }
  }))

  // Forward fetched data to your Client Component
  return chapterContent.map(({ chapter, exercises }) =>
    <ListExercises key={chapter.name} title={chapter.name} project={'c-programming-language'} exercises={exercises} />)
}