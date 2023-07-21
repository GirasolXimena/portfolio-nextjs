import { cProgrammingLanguageContent } from "../../../../../api/github"
import Exercise from "../../../components/exercise"

async function CProgrammingPage({
  params,
}: {
  params: { slug: string; }
}) {
  const [{ name,
    type,
    html_url,
    encoding,
    content
  }] = await cProgrammingLanguageContent(`chapter-1/${params.slug}`)
  return <Exercise
    type={type}
    title={name}
    github_link={html_url}
    encoding={encoding}
    content={content}
  />
}

export default CProgrammingPage