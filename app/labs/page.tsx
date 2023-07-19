import Link from "next/link";
const links = [
  {
    href: '/labs/eloquent-js',
    label: 'Eloquent JS Exercises',
  },
  {
    href: 'https://codepen.io/abstract_code',
    label: 'Codepen',
  },
]

export default async function LabsIndexPage() {
  return (
    <>
      <h1>Labs</h1>
      <ul>
        {
          links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <Link href={href}>
                {label}
              </Link>
            </li>
          ))
        }
      </ul>
    </>
  )
}