import { getContent } from "../../../../api/github"
import Exercise from "./exercise"

export default async function EloquentJSPage({ params }: { params: { slug: string } }) {
  const {name, type, html_url, encoding, content } = await getContent('RobertAndradeJr', 'eloquent-js-exercises', params.slug)
  const res = await getContent('RobertAndradeJr', 'eloquent-js-exercises', params.slug)

  return (
    <div>
      <h1>{res.path}</h1>
      {type === 'file' && <Exercise title={name} github_link={html_url} encoding={encoding} content={content} />}
    </div>
  )
}