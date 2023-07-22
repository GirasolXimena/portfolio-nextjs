const decoder = {
  base64(content: string) {
    return atob(content)
  }
}

export default decoder