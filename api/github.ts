import { GithhubRepoItems } from "../types";

// github.ts
const baseUrl = "https://api.github.com";
const API_TOKEN_GITHUB = process.env.API_TOKEN_GITHUB as string;

class GithubRepo {
  owner: string;
  repo: string;

  constructor(owner: string, repo: string) {
    this.owner = owner;
    this.repo = repo;
  }

  async getRepo(path: string = this.repo): Promise<GithhubRepoItems> {
    const response = await fetch(`${baseUrl}/repos/${this.owner}/${path}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN_GITHUB}`,
      },
    });
    return await response.json();
  }

  async getContent(path: string = ""): Promise<GithhubRepoItems> {
    const response = await this.getRepo(`${this.repo}/contents/${path}`);
    return Array.isArray(response) ? response : [response];
  }
}

// repo specific functions
const EloquentJS = new GithubRepo("RobertAndradeJr", "eloquent-js-exercises");
export const eloquentJSRepo = async () => await EloquentJS.getRepo();
export const eloquentJSContent = async (path: string) =>
  await EloquentJS.getContent(path);
export const eloquentJSFile = async (path: string) =>
  await EloquentJS.getContent(`src/${path}`);

const CProgrammingLanguage = new GithubRepo(
  "RobertAndradeJr",
  "c-programming-language",
);
export const cProgrammingLanguageRepo = async () =>
  await CProgrammingLanguage.getRepo();
export const cProgrammingLanguageContent = async (path: string) =>
  await CProgrammingLanguage.getContent(path);
