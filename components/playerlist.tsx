interface PlayerProps {
  player_id: number,
  player_name: string
  player_hometown: string
}

export default function PlayerList({ players }: { players: PlayerProps[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>NAME</th>
          <th>HOMETOWN</th>
        </tr>
      </thead>
      <tbody>
        {players.map((p: PlayerProps) => {
          return (
            <tr key={p.player_id}>
              <td>{p.player_name}</td>
              <td>{p.player_hometown}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
