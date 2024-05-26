import Prism from "prismjs";
export const normalizePath = (path: string, baseDir: string) =>
  path
    .split("/")
    .filter(
      (segment) => segment !== "." && segment !== ".." && segment !== baseDir,
    )
    .join("/");

export const getExtension = (path: string) => path.split(".").pop() || "";

export const highlightContent = (code: string, lang: string) =>
  Prism.highlight(code, Prism.languages[lang], lang);

export const fileNametoTitle = (name: string) =>
  name
    .split(".")[0]
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

/**
 * use prism js to extract first multiline comment of a file
 * and return an object with the first comment and the rest of the file
 * separated in two properties
 * @param {string} fileContent
 * @returns {{comment: string, content: string}}
 */
export const extractComment = (fileContent: string) => {
  const comment = fileContent.match(/\/\*([\s\S]*?)\*\//)?.[0] || "";
  const content = fileContent.replace(comment, "");
  return { comment, content };
};
