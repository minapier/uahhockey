// import { Link } from "react-router-dom";
'use client'
import Link from "next/link"

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/players">Players</Link>
        </li>
        <li>
          <Link href="/seasons">Seasons</Link>
        </li>
        <li>
          <Link href="https://github.com/minapier/uahhockey" target="_blank">GitHub</Link>
        </li>
      </ul>
    </nav>
  );
}
