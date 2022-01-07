import { useState } from "react";
import GameCard from "./GameCard";
import MatchContainer from "./MatchContainer";
import { Button, Box, Grid, Typography } from "@mui/material";
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

  if(userGames.length === 0){
    return (
      <Box
      container
      noValidate
      sx={{ mt: 3 }}
      style={{ justifyContent: "center" }}
    >
      <Grid item xs={12} sx={{ mt: 3 }} align="center">
    <Typography component="h1" variant="h4">
    You haven't played any games yet!
  </Typography>
  <Typography component="h1" variant="h4">
    Go to "Log New Game" next time you play one and save the results!
  </Typography>
  </Grid>
  </Box>)
  } 
  else if (selectedGame == "") {
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
  }
  else {
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
