export default function HomePage() {
  return (
    <>
      <h1>UAH Hockey Resource Site</h1>
      <p>
        From 1985 to 2021, the University of Alabama in Huntsville, my alma
        mater, had a varsity hockey team. I helped create the official program
        record book by creating a database with player, game, and statistical
        data. For practice, I created a Next.js/React app for a simple site that
        displays this data from an SQL Database hosted on Microsoft Azure. I
        plan to continue adding pages and features to it and eventually create a
        live site. For now, this is primarily for portfolio purposes to
        demonstrate my skills. -- Michael Napier
      </p>
      <ul>
        <li>Microsoft SQL Server database hosted on Azure</li>
        <li>Next.js React project using App Router, also for API routes</li>
        <li>Site deployed on Netlify</li>
        <li>
          <a href="https://github.com/minapier/uahhockey" target="_blank">
            GitHub repository
          </a>
        </li>
      </ul>
    </>
  );
}
