import "./ui/global.css";
import NavBar from "../components/navbar";

export const metadata = {
  title: "Statman's site: Michael Napier",
  description:
    "This is a sample website on Netlify using Next.js to display legacy UAH Hockey statistics from a SQL Server database on Microsoft Azure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="body">
        <div id="root" className="page-wrapper">
          <main className="main-wrapper">
            <NavBar />
            <div className="padding-global">
              <div className="container-full bg-color-white round-corners">
                {children}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
