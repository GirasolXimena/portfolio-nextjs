import Link from 'next/link'

export default function Navbar({ home }) {
  return (
    <nav id="nav-bar" className='nav-bar'>
      <ul className="nav-links">
        <li className="nav-link">
          <Link href={home ? '/labs' : '/'}>
            <a>
              {home ? 'Labs' : 'Home'}
            </a>
          </Link>
        </li>
        <li className="nav-link">
          <Link href="/resume">
            <a>
              Resume
            </a>
          </Link>
        </li>
        <li className="nav-link">
          <Link href="/posts">
            <a>
              Blog
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}