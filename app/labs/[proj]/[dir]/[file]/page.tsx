import { activeProjects } from "lib/projects";
import { getExtension, normalizePath } from "lib/util/string";
import ExerciseDetailPage from "../../../components/exercise-detail";
import Prism from "prismjs";
import decoder from "lib/decoder";

export async function generateStaticParams({ params }) {
  const currentProj = activeProjects.find(({ name }) => name === params.proj);
  const baseDir = currentProj?.baseDir || "";
  const getContent = currentProj?.content;
  if (!getContent)
    throw new Error(`no content function for project ${params.proj}`);
  const url = `${baseDir ? `${baseDir}/` : ""}`;
  const dirs = await (
    await getContent(url)
  ).filter(({ name, type }) => !name?.startsWith(".") && type === "dir");
  const files = await Promise.all(
    dirs.map(async (dir) => {
      const file = await getContent(`${url}${dir.name}`);
      return file.map(({ name }) => ({
        file: normalizePath(`${url}${dir.name}/${name}`, baseDir),
      }));
    }),
  );
  return files.flat();
}

export default async function Page({
  params,
}: {
  params: { file: string; dir: string; proj: string };
}) {
  const currentProj = activeProjects.find(({ name }) => name === params.proj);
  const baseDir = currentProj?.baseDir || "";
  const getContent = currentProj?.content;
  if (!getContent) throw new Error("no content function");
  const url = `${baseDir ? `${baseDir}/` : ""}${params.dir}/${params.file}`;
  const [{ name, type, html_url, encoding, content }] = await getContent(url);
  const code = decoder[encoding](content);
  const ext = getExtension(name);
  const { prismName } = decoder.language[ext];
  const highlightedContent = Prism.highlight(
    code,
    Prism.languages[prismName],
    prismName,
  );

  return (
    <ExerciseDetailPage
      type={type}
      title={name}
      github_link={html_url}
      subtitle={`labs/${params.proj}`}
      content={highlightedContent}
      prismName={prismName}
    />
  );
}
