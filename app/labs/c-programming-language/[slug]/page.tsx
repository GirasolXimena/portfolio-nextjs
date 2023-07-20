import { cProgrammingLanguageContent, eloquentJSFile } from "../../../../api/github"
import Exercise from "./exercise"

export default async function EloquentJSPage({ params }: { params: { slug: string } }) {
  const [{name, type, html_url, encoding, content }] = await cProgrammingLanguageContent(`chapter-1/${params.slug}`)
  return (
    <div>
      <h1>programming c {params.slug}</h1>
      {type === 'file' && <Exercise title={name} github_link={html_url} encoding={encoding} content={content} />}
    </div>
  )
}