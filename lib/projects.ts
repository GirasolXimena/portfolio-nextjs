import { cProgrammingLanguageContent, eloquentJSContent } from "../api/github"

export const activeProjects = [
  {
    name: 'c-programming-language',
    content: cProgrammingLanguageContent,
    baseDir: '',
  },
  {
    name: 'eloquent-js-exercises',
    content: eloquentJSContent,
    baseDir: 'src',
  }
]