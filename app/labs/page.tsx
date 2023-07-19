import Link from "next/link";

export default async function LabsIndexPage() {
  return (
    <>
      <h1>hello</h1>
      <ul>
        <li>
          <Link href="/labs/eloquent-js">Eloquent JS Exercises</Link>
        </li>
      </ul>
    </>
  )
}