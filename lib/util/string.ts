export const normalizePath = (path: string, baseDir: string) => path.split('/').filter(segment => segment !== '.' && segment !== '..' && segment !== baseDir).join('/')

export const getExtension = (path: string) => path.split('.').pop() || ''