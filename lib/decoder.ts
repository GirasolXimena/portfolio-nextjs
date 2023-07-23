const decoder = {
  base64(content: string) {
    return atob(content)
  },
  language: {
    ts: {
      name: 'typescript',
      ext: 'ts',
      prismName: 'javascript',
    },
    c: {
      name: 'c',
      ext: 'c',
      prismName: 'clike',
    }
  }
}

export default decoder