export const normalizePath = (path: string, baseDir: string) => path.split('/').filter(segment => segment !== '.' && segment !== '..' && segment !== baseDir).join('/')