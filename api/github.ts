// github.js
import { Octokit } from '@octokit/core';
const octokit = new Octokit({ auth: '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' });

export async function getFolders(owner, repo) {
  const response = await octokit.request(`GET /repos/{owner}/{repo}/contents`, {
    owner,
    repo,
  });
  return response.data.filter((item) => item.type === 'dir');
}

export async function getFolderContent(owner: string, repo: string, folderPath: string) {
  const response = await octokit.request(`GET /repos/{owner}/{repo}/contents/{folderPath}`, {
    owner,
    repo,
    folderPath,
  });
  return response.data;
}

export async function getContent(owner: string, repo: string, slug: string) {
  const response = await octokit.request(`GET /repos/{owner}/{repo}/contents/src/{slug}`, {
    owner,
    repo,
    slug,
  });
  return response.data
}
