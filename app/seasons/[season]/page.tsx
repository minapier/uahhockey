"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

interface SeasonResult {
  game_id: number;
  game_date: string;
  location: string;
  opponent: string;
  conference: string;
  result: string;
  uah_score: number;
  opp_score: number;
  ot?: string;
  event: string;
  attendance: number;
}

interface SeasonRecord {
  wins: number;
  losses: number;
  ties: number;
}

export default function SeasonResultsPage() {
  const params = useParams<{ season: string }>();
  const season = params?.season;

  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  // Season state
  const [seasonResults, setSeasonResults] = useState([]);
  const [seasonRecord, setSeasonRecord] = useState({
    wins: 0,
    losses: 0,
    ties: 0,
  });
  const [seasonRecordConf, setSeasonRecordConf] = useState({
    wins: 0,
    losses: 0,
    ties: 0,
  });

  /* Fetch the player data */
  useEffect(() => {
    const getSeasonResults = async () => {
      try {
        const response = await fetch("/api/seasons/" + season);
        const seasonData = await response.json();
        setSeasonResults(seasonData["results"]);
        let seasonRecordData: SeasonRecord = seasonData["record"];
        setSeasonRecord(seasonRecordData[0]);
        let seasonConfData: SeasonRecord = seasonData["conf"];
        setSeasonRecordConf(seasonConfData[0]);
      } catch (e) {
        console.log("ERROR! ", e);
      } finally {
        setIsLoading(false);
      }
    };
    getSeasonResults();
  }, []);

  if (isLoading) return <p>Loading season results...</p>;

  const numConfGames = seasonRecordConf.wins + seasonRecordConf.losses + seasonRecordConf.ties;
  const showConfRecord: Boolean = (numConfGames > 0);

  return (
    <>
      <h1>{season} UAH Chargers</h1>
      <p>
        Record: {seasonRecord.wins}-{seasonRecord.losses}-{seasonRecord.ties}<br />
        {showConfRecord &&
          `Conference: ${seasonRecordConf.wins}-${seasonRecordConf.losses}-${seasonRecordConf.ties}`}
      </p>
      <div className="stats-table">
        <div className="trow theader">
          <div className="tcell">Date</div>
          <div className="tcell"></div>
          <div className="tcell">Opponent</div>
          <div className="tcell">Conf</div>
          <div className="tcell">Result</div>
          <div className="tcell">UAH</div>
          <div className="tcell">Opp</div>
          <div className="tcell">OT</div>
          <div className="tcell">Attendance</div>
          <div className="tcell">Event</div>
        </div>
        {seasonResults.map((game: SeasonResult) => {
          let gameDate = new Date(game.game_date);
          return (
            <div className="trow" key={game.game_id}>
              <div className="tcell">{gameDate.toDateString()}</div>
              <div className="tcell">{game.location}</div>
              <div className="tcell">{game.opponent}</div>
              <div className="tcell">{game.conference}</div>
              <div className="tcell">{game.result}</div>
              <div className="tcell">{game.uah_score}</div>
              <div className="tcell">{game.opp_score}</div>
              <div className="tcell">{game.ot}</div>
              <div className="tcell">{game.attendance}</div>
              <div className="tcell">{game.event}</div>
            </div>
          );
        })}
      </div>
      <Link href="/players">Back to season list</Link>
    </>
  );
}
