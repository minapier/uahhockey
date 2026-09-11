import Link from "next/link"
import { useMemo } from "react";

interface SeasonResults {
  season: string,
  wins: number, 
  losses: number,
  ties: number
}

export default function SeasonList({ seasons }: { seasons: SeasonResults[] }) {
  const totalWins = useMemo(() => {
    return seasons.reduce((sum, season) => sum + season.wins, 0);
  }, [seasons])
  const totalLosses = useMemo(() => {
    return seasons.reduce((sum, season) => sum + season.losses, 0);
  }, [seasons]);
  const totalTies = useMemo(() => {
    return seasons.reduce((sum, season) => sum + season.ties, 0);
  }, [seasons]);
  return (
    <table>
      <thead>
        <tr>
          <th>SEASON</th>
          <th>RECORD</th>
        </tr>
      </thead>
      <tbody>
        {seasons.map((s: SeasonResults) => {
          return (
            <tr key={s.season}>
              <td>{s.season}</td>
              <td>{s.wins}-{s.losses}-{s.ties}</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td>{seasons.length} seasons</td>
          <td>{totalWins}-{totalLosses}-{totalTies}</td>
        </tr>
      </tfoot>
    </table>
  );
}
