import { getEloquentFile } from "../../../../api/github"
import Exercise from "./exercise"

export default async function EloquentJSPage({ params }: { params: { slug: string } }) {
  const {name, type, html_url, encoding, content } = await getEloquentFile(params.slug)

  return (
    <div>
      {type === 'file' && <Exercise title={name} github_link={html_url} encoding={encoding} content={content} />}
    </div>
  )
}