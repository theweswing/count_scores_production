import { useState } from "react";
import GameCard from "./GameCard";
import MatchContainer from "./MatchContainer";

const GameContainer = ({ user, userGames }) => {
  const [selectedGame, setSelectedGame] = useState("");

  let game_ids = [];
  const mapGames = userGames.map((game) => {
    if (game_ids.includes(game.id) === false) {
      game_ids.push(game.id);
      return (
        <GameCard
          key={game.id}
          id={game.id}
          user={user}
          game={game}
          setSelectedGame={setSelectedGame}
        />
      );
    }
  });

  if (selectedGame == "") {
    return <div>{mapGames}</div>;
  } else {
    return <MatchContainer selectedGame={selectedGame} user={user} />;
  }
};

export default GameContainer;
