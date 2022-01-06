import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const GameCard = ({ user, game, setSelectedGame }) => {
  const [gameAnalytics,setGameAnalytics] = useState({
    game: game.name,
    gamesPlayed: null,
    gamesWon: null,
    winPercentage: null,
    averageScore: null
  })

  const handleSelectGame = () => {
    setSelectedGame(game);
  };

  useEffect(() => {
    fetch(
      `/users/${user.id}/games/${game.id}/matches`
    )
      .then((res) => res.json())
      .then((matchData) => {
        console.log(matchData)
        console.log(obtainAnalytics(matchData))
        ;
      });
  }, []);

  const obtainAnalytics = (data) => {
    let gp = 0
    let gw = 0
    let wp = 0
    let totpt = 0
    let avgsc = 0
    let areScores = false
    data.map((givenMatch) => {
      gp = gp+1
      let playerData = givenMatch.players.find(isPlayer)
      if (playerData.score) {
        totpt = totpt + playerData.score
        areScores = true
      }
      if (playerData.is_winner == true){
        gw = gw+1
      }
    })
    if (gw > 0){
      wp = truncatedWinPercentage(gw,gp)
    }
    else {
      wp = 0
    }
    if (areScores){
      avgsc = truncatedAverageScore(totpt,gp)
    }
    else {
      avgsc =  "N/A"
    }
    let output = {
      game: game.name,
      gamesPlayed: gp,
      gamesWon: gw,
      winPercentage: wp,
      averageScore: avgsc
    }
    setGameAnalytics(output)
    return output
  }

  const isPlayer = (player) => {
    return player.user_id == user.id
  }

  const truncatedAverageScore = (num1,num2) => {
    let avg = num1/num2
    let scoreString = avg.toString()
    let indexOfDecimal = scoreString.indexOf(".")
    let truncatedPercentage = scoreString.slice(0,indexOfDecimal+3)
    return(parseFloat(truncatedPercentage))
  }
  
  const truncatedWinPercentage = (num1,num2) => {
    let wp = (num1/num2)*100
    let scoreString = wp.toString()
    let indexOfDecimal = scoreString.indexOf(".")
    let truncatedPercentage = scoreString.slice(0,indexOfDecimal+3)
    return(parseFloat(truncatedPercentage))
  }

  return (
    <div>
      <Box container noValidate sx={{ mt: 3 }}>
        <Grid item xs={12} sx={{ mt: 3 }}>
          <Card sx={{ maxWidth: 275 }}>
            <CardContent align="center">
              <Typography variant="h5" component="div">
                {game.name}
              </Typography><br></br>
              <Typography variant="h7" component="div">
                {`Average Score: ${gameAnalytics.averageScore}`}
              </Typography><br></br>
              <Typography variant="h7" component="div">
                {`Win Percentage: ${gameAnalytics.winPercentage}% (${gameAnalytics.gamesWon}/${gameAnalytics.gamesPlayed})`}
              </Typography>
            </CardContent>
            <CardContent align="center">
              <Button size="small" align="right" onClick={handleSelectGame}>
                Select Game
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </div>
  );
};

export default GameCard;
