import axios from "axios";
import PlayersList from "../PlayersList";
import { useState, useEffect } from "react";

export default function PlayersListPage() {
  const [players, setPlayers] = useState([]); // Full player data
  const [pageNumber, setPageNumber] = useState(1); // Page number of table
  const [playersToDisplay, setPlayersToDisplay] = useState([]); // Slice of players to display
  const [maxPages, setMaxPages] = useState(1);
  const valuesPerPage = 20;

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const response = await axios.get("/api/players");
        setPlayers(response.data);
        setPlayersToDisplay(response.data.slice(0, valuesPerPage));       
        setMaxPages(Math.floor(response.data.length / valuesPerPage) + 1);       
      } catch (e) {
        console.log("ERROR: ", e);
      }
    };
    getPlayers();
  }, []);

  const goOnPrevPage = () => {
    if (pageNumber === 1) return;
    setPageNumber((prev) => prev - 1);
  };

  const goOnNextPage = () => {
    if (pageNumber === maxPages) return;
    setPageNumber((prev) => prev + 1);
  };

  const handleSelectChange = (e) => {
    setPageNumber(e.target.value);
  };

  useEffect(() => {
    const start = (pageNumber - 1) * valuesPerPage;
    const end = pageNumber * valuesPerPage;
    setPlayersToDisplay(players.slice(start, end));
  }, [pageNumber]);

  if (players.length == 0) return <div>Loading...</div>;

  return (
    <>
      <h1>UAH Hockey Players</h1>
      <div className="text-left">
        <p>
          {players.length} players found. Displaying page {pageNumber}.
        </p>
      </div>

      <div id="container">
        <div id="page-no-dropdown">
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
        <PlayersList players={playersToDisplay} />
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
