const decoder = {
  base64(content) {
    return atob(content)
  }
}

export default decoder