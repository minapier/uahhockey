"use client";
import PlayerList from "../../components/playerlist";
import { useState, useEffect } from "react";

export default function PlayersListPage() {
  // Full player data
  const [players, setPlayers] = useState([]);
  // Page number of table
  const [pageNumber, setPageNumber] = useState(1);
  // Slice of players to display
  const [playersToDisplay, setPlayersToDisplay] = useState([]);
  // Max number of pages based on number of players (for dropdown)
  const [maxPages, setMaxPages] = useState(1);
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  // Number of players per page
  const valuesPerPage: number = 20;

  /* Fetch the player data */
  useEffect(() => {
    const getPlayers = async () => {
      try {
        const response = await fetch("/api/players");
        const data = await response.json();
        setPlayers(data);
        setPlayersToDisplay(data.slice(0, valuesPerPage));
        setMaxPages(Math.floor(data.length / valuesPerPage) + 1);
      } catch (e) {
        console.log("ERROR! ", e);
      } finally {
        setIsLoading(false);
      }
    };
    getPlayers();
  }, []);

  /* Decrease page number if Previous button clicked */
  const goOnPrevPage = () => {
    if (pageNumber === 1) return;
    setPageNumber((prev) => prev - 1);
  };

  /* Increase page number if Next button clicked */
  const goOnNextPage = () => {
    if (pageNumber === maxPages) return;
    setPageNumber((prev) => prev + 1);
  };

  /* Set the page number if the dropdown option is selected */
  const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e,
  ) => {
    setPageNumber(Number(e.target.value));
  };

  /* Get the slice of players to display based on page number */
  useEffect(() => {
    const start = (pageNumber - 1) * valuesPerPage;
    const end = pageNumber * valuesPerPage;
    setPlayersToDisplay(players.slice(start, end));
  }, [pageNumber]);

  if (isLoading) return <p>Loading players...</p>;
  
  return (
    <>
      <h1>UAH Hockey Players</h1>
      <div id="container">
        <div className="text-left">
          <p>
            {players.length} players found. Displaying page {pageNumber}.
          </p>
        </div>
        <div id="page-no-dropdown">
          Select page:
          <select
            name="page-number"
            onChange={handleSelectChange}
            value={pageNumber}
          >
            {Array.from(Array(maxPages))
              .map((e, i) => i + 1)
              .map((val) => {
                return <option key={val}>{val}</option>;
              })}
          </select>
        </div>
        <PlayerList players={playersToDisplay} />
        <div id="btn-container">
          <button onClick={goOnPrevPage} disabled={pageNumber === 1}>
            Prev
          </button>
          <button onClick={goOnNextPage} disabled={pageNumber === maxPages}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
