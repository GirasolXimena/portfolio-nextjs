// github.js
const baseUrl = 'https://api.github.com';
const { GITHUB_TOKEN } = process.env;


export async function getContent(owner: string, repo: string, slug:string='') {
  const response = await fetch(`${baseUrl}/repos/${owner}/${repo}/contents/${slug}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    }
  });

  return await response.json();
}

export async function getRepo(owner: string, repo: string) {
  const response = await fetch(`${baseUrl}/repos/${owner}/${repo}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    }
  });
  return await response.json();
}

export async function getEloquentContent(path: string = '') {
  const owner = 'RobertAndradeJr'
  const repo = 'eloquent-js-exercises'
  return await getContent(owner, repo, path);
}

export const getEloquentFile = async (filePath) => getEloquentContent(`src/${filePath}`);