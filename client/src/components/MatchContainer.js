import { useEffect, useState } from "react";
import MatchCard from "./MatchCard";

const MatchContainer = ({ selectedGame, user }) => {
  const [matchData, setMatchData] = useState([]);

  useEffect(() => {
    fetch(
      `/users/${user.id}/games/${selectedGame.id}/matches`
    )
      .then((res) => res.json())
      .then((matchData) => {
        setMatchData(matchData);
      });
  }, []);

  const mapMatches = matchData.map((match) => {
    return (
      <MatchCard
        key={match.id}
        id={match.id}
        date={match.date}
        players={match.players}
        user={user}
      />
    );
  });

  return <div>{mapMatches}</div>;
};

export default MatchContainer;
