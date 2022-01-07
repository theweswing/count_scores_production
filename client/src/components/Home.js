import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useState } from "react";
import GameContainer from "./GameContainer";
import AddNewGame from "./AddNewGame";
import Header from "./Header";

const Home = ({ user, setUser }) => {
  const [userGames, setUserGames] = useState([]);
  const [clickFind, setClickFind] = useState(true);
  const [addNew, setAddNew] = useState(true);

  const handleFindGames = () => {
    fetch(`/users/${user.id}/games`)
      .then((res) => res.json())
      .then((gameData) => {
        let sortedGames = gameData.sort((a, b) => (a.name > b.name ? 1 : -1));
        setUserGames(sortedGames);
        setClickFind((clickFind) => !clickFind);
      });
  };

  const handleAddGame = () => {
    setAddNew((addNew) => !addNew);
  };

  return (
    <div>
      <Header
        setUser={setUser}
        setClickFind={setClickFind}
        setAddNew={setAddNew}
      />

      {clickFind && addNew ? (
        <div>
          <Box container noValidate sx={{ mt: 3 }} style={{ display: "flex" }}>
            <Grid item xs={12} sx={{ mt: 3, mr: 5 }} align="right">
              <Card sx={{ maxWidth: 275 }}>
                <CardContent align="center" sx={{ mt: 3 }}>
                  <Typography variant="h5" component="div">
                    My Games
                  </Typography>
                </CardContent>
                <CardContent align="center">
                  <Button size="small" align="right" onClick={handleFindGames}>
                    View
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sx={{ mt: 3, ml: 5 }} align="left">
              <Card sx={{ maxWidth: 275 }}>
                <CardContent align="center" sx={{ mt: 3 }}>
                  <Typography variant="h5" component="div">
                    Log New Game
                  </Typography>
                </CardContent>
                <CardContent align="center">
                  <Button size="small" align="right" onClick={handleAddGame}>
                    Add
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Box>
        </div>
      ) : !clickFind && addNew ? (
        <div>
          <GameContainer
            user={user}
            userGames={userGames}
            setClickFind={setClickFind}
          />
        </div>
      ) : clickFind && !addNew ? (
        <div>
          <AddNewGame user={user} setAddNew={setAddNew} />
        </div>
      ) : null}
    </div>
  );
};

export default Home;
