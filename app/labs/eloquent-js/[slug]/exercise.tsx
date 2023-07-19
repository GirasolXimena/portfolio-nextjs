'use client'
import decoder from '../../../../lib/decoder'
 
// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
export default function HomePage({ title, content, github_link, encoding }) {
  return (
    <div>
      <h1>{title}</h1>
      <pre>{decoder[encoding](content)}</pre>
      <a href={github_link}>View on Github!</a>
    </div>
  )
}