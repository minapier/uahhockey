"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

interface PlayerInfo {
  player_id: string;
  player_name: string;
  player_hometown: string;
}

interface PlayerStats {
  rec_id: number;
  season: string;
  position: string;
  year: string;
  games: number;
  goals: number;
  assists: number;
  ppg: number;
  shg: number;
  gwg: number;
  penalties: number;
  pim: number;
  wins: number;
  losses: number;
  ties: number;
  minutes: number;
  goals_against: number;
  saves: number;
  shutouts: number;
}

export default function PlayerInfoPage() {
  const params = useParams<{ player_id: string }>();
  const player_id = params?.player_id;

  // Player ID
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  const [playerInfo, setPlayerInfo] = useState({
    player_id: player_id,
    player_name: "NA",
    player_hometown: "NA",
  });
  const [playerStats, setPlayerStats] = useState([]);

  /* Fetch the player data */
  useEffect(() => {
    const getPlayerStats = async () => {
      try {
        const response = await fetch("/api/players/" + player_id);
        const playerData = await response.json();
        const newPlayerInfo: PlayerInfo = playerData["info"];
        setPlayerInfo(newPlayerInfo[0]);
        const newPlayerStats = playerData["stats"];
        setPlayerStats(newPlayerStats);
      } catch (e) {
        console.log("ERROR! ", e);
      } finally {
        setIsLoading(false);
      }
    };
    getPlayerStats();
  }, []);

  if (isLoading) return <p>Loading stats...</p>;

  return (
    <>
      <h1>{playerInfo.player_name}</h1>
      <p>Hometown: {playerInfo.player_hometown}</p>
      <div className="stats-table">
        <div className="trow theader">
          <div className="tcell">Season</div>
          <div className="tcell">Pos</div>
          <div className="tcell">Year</div>
          <div className="tcell">GP</div>
          <div className="tcell">G</div>
          <div className="tcell">A</div>
          <div className="tcell">PPG</div>
          <div className="tcell">SHG</div>
          <div className="tcell">GWG</div>
          <div className="tcell">Pen</div>
          <div className="tcell">PIM</div>
          <div className="tcell">W</div>
          <div className="tcell">L</div>
          <div className="tcell">T</div>
          <div className="tcell">Mins</div>
          <div className="tcell">GA</div>
          <div className="tcell">SV</div>
          <div className="tcell">SO</div>
        </div>
        {playerStats.map((s: PlayerStats) => {
          return (
            <div className="trow" key={s.rec_id}>
              <div className="tcell">{s.season}</div>
              <div className="tcell">{s.position}</div>
              <div className="tcell">{s.year}</div>
              <div className="tcell">{s.games}</div>
              <div className="tcell">{s.goals}</div>
              <div className="tcell">{s.assists}</div>
              <div className="tcell">{s.ppg}</div>
              <div className="tcell">{s.shg}</div>
              <div className="tcell">{s.gwg}</div>
              <div className="tcell">{s.penalties}</div>
              <div className="tcell">{s.pim}</div>
              <div className="tcell">{s.wins}</div>
              <div className="tcell">{s.losses}</div>
              <div className="tcell">{s.ties}</div>
              <div className="tcell">{s.minutes}</div>
              <div className="tcell">{s.goals_against}</div>
              <div className="tcell">{s.saves}</div>
              <div className="tcell">{s.shutouts}</div>
            </div>
          );
        })}
      </div>
      <Link href="/players">Back to player list</Link>
    </>
  );
}
