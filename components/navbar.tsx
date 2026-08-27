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
          <Link href="/players">UAH Hockey Players</Link>
        </li>        
      </ul>
    </nav>
  );
}
