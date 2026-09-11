"use client";
import SeasonList from "../../components/seasonlist";
import { useState, useEffect } from "react";

export default function SeasonListPage() {
  // Full season data
  const [seasons, setSeasons] = useState([]);
  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  /* Fetch the seasons data */
  useEffect(() => {
    const getSeasons = async () => {
      try {
        const response = await fetch("/api/seasons");
        const data = await response.json();
        setSeasons(data);
        console.log("seasons = ", seasons);
      } catch (e) {
        console.log("ERROR! ", e);
      } finally {
        setIsLoading(false);
      }
    };
    getSeasons();
  }, []);

  if (isLoading) return <p>Loading seasons...</p>;

  return (
    <>
      <h1>UAH Hockey Seasons</h1>
      <div id="container">
        <SeasonList seasons={seasons} />
      </div>
    </>
  );
}
