import { eloquentJSFile } from "../../../../../api/github"
import Exercise from "../../../components/exercise"

export default async function EloquentJSPage({
  params,
}: {
  params: { slug: string; }
}) {
  const [{ name,
    type,
    html_url,
    encoding,
    content
  }] = await eloquentJSFile(params.slug)
  return <Exercise
    type={type}
    title={name}
    github_link={html_url}
    encoding={encoding}
    content={content}
  />
}