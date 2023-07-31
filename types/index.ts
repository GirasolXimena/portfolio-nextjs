interface GithubRepoLinks {
  self: string;
  git: string;
  html: string;
}

export interface GithubRepoItem {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  encoding: string;
  content: string;
  _links: GithubRepoLinks;
}

export type GithhubRepoItems = GithubRepoItem[];

type PaletteProperties = {
  light: string;
  dark: string;
  primary: string;
  secondary: string;
  tertiary: string;
  font: string;
};

type Palette = {
  properties: PaletteProperties;
  audio?: string; // the audio property is optional
};

export interface Palettes {
  [key: string]: Palette;
}
