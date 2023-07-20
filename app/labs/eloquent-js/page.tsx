// Import your Client Component
import ListExercises from './list-exercises'
import { getEloquentContent } from '../../../api/github'
 
export default async function EloquentJSIndexPage() {
  // Fetch data directly in a Server Component
  const eloquentExercises = await getEloquentContent('src')
  // Forward fetched data to your Client Component
  return <ListExercises title={'Eloquent JS Exercises'} exercises={eloquentExercises} />
}