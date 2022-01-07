import { useState } from "react";
import GameCard from "./GameCard";
import MatchContainer from "./MatchContainer";
import { Button, Box, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const GameContainer = ({ user, userGames, setClickFind }) => {
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
    return (
      <Box
        container
        noValidate
        sx={{ mt: 3 }}
        style={{ justifyContent: "center" }}
      >
        <Grid align="left" sx={{ ml: 5 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => setClickFind(true)}
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ mt: 3 }} align="center">
          {mapGames}
        </Grid>
      </Box>
    );
  } else {
    return (
      <MatchContainer
        selectedGame={selectedGame}
        user={user}
        setSelectedGame={setSelectedGame}
      />
    );
  }
};

export default GameContainer;
