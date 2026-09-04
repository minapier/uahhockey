import Link from "next/link"

interface Player {
  player_id: number,
  player_name: string
  player_hometown: string
}

export default function PlayerList({ players }: { players: Player[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>NAME</th>
          <th>HOMETOWN</th>
        </tr>
      </thead>
      <tbody>
        {players.map((p: Player) => {
          return (
            <tr key={p.player_id}>
              <td><Link href={`/players/${p.player_id}`}>{p.player_name}</Link></td>
              <td>{p.player_hometown}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
