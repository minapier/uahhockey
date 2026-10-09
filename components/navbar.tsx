// import { Link } from "react-router-dom";
'use client'
import Link from "next/link"

export default function NavBar() {
  return (
    <nav className="navbar bg-color-uah-blue">
      <div className="navbar_container padding-global">
        <Link className="title-text navbar_link" href="/">
          UAH Hockey Resource Site
        </Link>
        <div className="navbar_links">
          <Link className="navbar_link" href="/players">
            Players
          </Link>
          <Link className="navbar_link" href="/seasons">
            Seasons
          </Link>
          <Link
            className="navbar_link"
            href="https://github.com/minapier/uahhockey"
            target="_blank"
          >
            GitHub
          </Link>
        </div>
      </div>
    </nav>
  );
}
