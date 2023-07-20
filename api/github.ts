// github.js
const baseUrl = 'https://api.github.com';
const { GITHUB_TOKEN } = process.env;

export async function getRepo(owner: string, repo: string) {
  const response = await fetch(`${baseUrl}/repos/${owner}/${repo}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    }
  });
  return await response.json();
}

export const getContent = async (owner: string, repo: string, path: string = '') =>
  await getRepo(owner, `${repo}/contents/${path}`)



// repo specific functions

/**
 * 
 * @param path 
 * @returns 
 */
export const getEloquentContent = async(path: string = '') =>
  await getContent('RobertAndradeJr', 'eloquent-js-exercises', path);

export const getEloquentFile = async (filePath) =>
  await getEloquentContent(`src/${filePath}`);