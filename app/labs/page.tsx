// Import your Client Component
import ListExercises from './list-exercises'
import { getFolderContent } from '../../api/github'
 
export default async function LabsIndexPage() {
  // Fetch data directly in a Server Component
  const eloquentExercises = await getFolderContent('RobertAndradeJr', 'eloquent-js-exercises', 'src')
  // Forward fetched data to your Client Component
  return <ListExercises title={'Eloquent JS Exercises'} exercises={eloquentExercises} />
}