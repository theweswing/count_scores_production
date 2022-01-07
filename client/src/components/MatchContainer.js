import { useEffect, useState } from "react";
import MatchCard from "./MatchCard";
import { Button, Box, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const MatchContainer = ({ setSelectedGame, selectedGame, user }) => {
  const [matchData, setMatchData] = useState([]);

  useEffect(() => {
    fetch(`/users/${user.id}/games/${selectedGame.id}/matches`)
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
          onClick={() => setSelectedGame("")}
        >
          Back
        </Button>
      </Grid>

      <Grid item xs={12} sx={{ mt: 3 }} align="center">
        <Typography component="h1" variant="h4">
          {selectedGame.name}
        </Typography>
        {mapMatches}
      </Grid>
    </Box>
  );
};

export default MatchContainer;
