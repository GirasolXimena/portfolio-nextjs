'use client'
 import "prismjs/themes/prism-tomorrow.css";
// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
function ExerciseDetailPage({ title, content, github_link, encoding, type }) {
  if(type !== 'file') {
    return (
      <div>
        <h1>Not a file</h1>
      </div>
    )
  }
  return (
    <div>
      <h1>{title}</h1>
      <pre style={{ backgroundColor: 'black', maxWidth: '800px', overflowX: 'auto'}}>
        <code className="language-js" dangerouslySetInnerHTML={{__html: content}} />
      </pre>
      <a href={github_link}>View on Github!</a>
    </div>
  )
}

export default ExerciseDetailPage