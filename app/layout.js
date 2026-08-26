// import "./src/styles.css"
import NavBar from "../components/navbar";

export const metadata = {
    title: "Statman's site: Michael Napier",
    description: "This is a sample website on Netlify using Next.js to display legacy UAH Hockey statistics from a SQL Server database on Microsoft Azure."
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div id="root">{children}</div>        
      </body>
    </html>
  );
}
