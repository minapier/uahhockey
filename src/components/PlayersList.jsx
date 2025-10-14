export default function PlayersList({ players }) {
  return (
    <table>
      <thead>
        <tr>
          <th>NAME</th>
          <th>HOMETOWN</th>
        </tr>
      </thead>
      <tbody>
        {players.map((p) => {
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
