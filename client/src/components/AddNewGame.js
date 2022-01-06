import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const AddNewGame = ({ user }) => {
  const [allGames, setAllGames] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [gameInput, setGameInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [newMatch, setNewMatch] = useState({
    game_id: null,
    date: dateInput,
  });
  const [allPlayers, setAllPlayers] = useState([
    {
      user_id: user.id,
      match_id: null,
      score: null,
      is_winner: false,
      name: `${user.first_name} ${user.last_name}`,
      email: ""
    },
  ]);
  const [allPlayerEmails, setAllPlayerEmails] = useState([user.email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGameInput(gameInput);
    setGameInput("");
    setDateInput("");
    setNewMatch({
      game_id: null,
      date: dateInput,
    });
    setAllPlayers([
      {
        user_id: user.id,
        match_id: null,
        score: null,
        is_winner: false,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email
      },
    ]);
    setAllPlayerEmails([user.email]);
    e.target.reset();
  };

  const handleMatch = (game) => {
    let newMatchEntry = { ...newMatch, game_id: game.id, date: dateInput };
    fetch("/matches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMatchEntry),
    }).then((res) => {
      if (res.ok) {
        res.json().then((matchInDB) => {
          console.log(`Match Added To DB: ${JSON.stringify(matchInDB)}`);
          handlePlayerSubmit(matchInDB);
        });
      } else {
        res.json().then((errors) => console.log(errors));
      }
    });
  };

  const handlePlayerSubmit = (match) => {
    comparePlayerEmails();
    let playersForEntry = [...allPlayers];
    let playerEntries = playersForEntry.map((givenPlayer) => {
      givenPlayer.match_id = match.id;
      fetch("/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(givenPlayer),
      }).then((res) => {
        if (res.ok) {
          res.json().then((playerinDB) => {
            console.log(
              `Player Added to DB: ${JSON.stringify(playerinDB, null, 4)}`
            );
          });
        } else {
          res
            .json()
            .then((errors) => console.log(`${givenPlayer.name} : ${errors}`));
        }
      });
    });
    
  };

  const handleGameInput = (input) => {
    let inputComparison = input.toLowerCase();
    let gameInDB = false;
    let gameForEntry = false;
    let comparedGames = allGames.map((givenGame) => {
      let gameComparison = givenGame.name.toLowerCase();
      if (inputComparison === gameComparison) {
        gameInDB = true;
        gameForEntry = givenGame;
        console.log(`Game Entry Found: ${givenGame.name}`);
      }
    });
    if (gameInDB === false) {
      fetch("/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: input,
        }),
      }).then((res) => {
        if (res.ok) {
          res.json().then((newGameEntry) => {
            gameForEntry = newGameEntry;
            console.log(`Game For Entry: ${JSON.stringify(gameForEntry)}`);
            setNewMatch({
              ...newMatch,
              game_id: gameForEntry.id,
              date: dateInput,
            });
            handleMatch(gameForEntry);
          });
        } else {
          res.json().then((errors) => console.log(errors));
        }
      });
    }
    if (gameInDB === true) {
      console.log(`Game For Entry: ${JSON.stringify(gameForEntry)}`);
      setNewMatch({ ...newMatch, game_id: gameForEntry.id, date: dateInput });
      handleMatch(gameForEntry);
    }
  };

  useEffect(() => {
    fetch("/games").then((r) => {
      if (r.ok) {
        r.json().then((games) => setAllGames(games));
      }
    });
  }, []);

  useEffect(() => {
    fetch("/users").then((r) => {
      if (r.ok) {
        r.json().then((users) => setAllUsers(users));
      }
    });
  }, []);

  const handlePlayerName = (e) => {
    const indexValue = parseInt(e.target.name);
    let playerEntries = [...allPlayers];
    playerEntries[indexValue].name = e.target.value;
    setAllPlayers(playerEntries);
  };

  const handlePlayerScore = (e) => {
    const indexValue = parseInt(e.target.name);
    let playerEntries = [...allPlayers];
    playerEntries[indexValue].score = e.target.value;
    setAllPlayers(playerEntries);
  };

  const handlePlayerEmail = (e) => {
    const indexValue = parseInt(e.target.name);
    let playerEmails = [...allPlayerEmails];
    playerEmails[indexValue] = e.target.value;
    setAllPlayerEmails(playerEmails);
    let playerEntries = [...allPlayers];
    playerEntries[indexValue].email = e.target.value;
    setAllPlayers(playerEntries)
    console.log(allPlayerEmails);
  };

  const handlePlayerWin = (e) => {
    const indexValue = parseInt(e.target.name);
    let playerEntries = [...allPlayers];
    playerEntries[indexValue].is_winner = !playerEntries[indexValue].is_winner
    setAllPlayers(playerEntries)
    console.log(playerEntries)
  }

  const comparePlayerEmails = () => {
    let counter = 0;
    let comparedEmails = allPlayerEmails.map((givenPlayerEmail) => {
      let playerList = [...allPlayers];
      let emailComparison = givenPlayerEmail.toLowerCase();
      let comparedUsers = allUsers.map((givenUser) => {
        let databaseEmail = givenUser.email;
        if (emailComparison === databaseEmail.toLowerCase()) {
          playerList[counter].user_id = givenUser.id;
          playerList[counter].email = givenUser.email
          playerList[counter].name = `${givenUser.first_name} ${givenUser.last_name}`
          console.log(`User Found for ${databaseEmail} at id ${givenUser.id}`);
          setAllPlayers(playerList);
        }});
      counter += 1;});
  };

  const addPlayer = (e) => {
    setAllPlayers([
      ...allPlayers,
      {
        user_id: 1,
        match_id: null,
        score: null,
        is_winner: false,
        name: "",
        email: ""
      },
    ]);
    setAllPlayerEmails([...allPlayerEmails, ""]);
    console.log(allPlayers);
  };

  const removePlayer = (e) => {
    let playersMinusOne = [...allPlayers];
    playersMinusOne.pop();
    setAllPlayers(playersMinusOne);
  };

  const spawnPlayers = () => {
    let counter = 0;
    const displayedPlayers = [...allPlayers].map((givenPlayer) => {
        counter = counter + 1;
      return (
        <>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              autoComplete={`player${counter}name`}
              id={`player${counter}name`}
              label={`Player ${counter} Name`}
              name={`${counter - 1}`}
              onChange={handlePlayerName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              autoComplete={`player${counter}name`}
              id={`player${counter}name`}
              label={`Player ${counter} Email (Link score to a friend's account!)`}
              name={`${counter - 1}`}
              onChange={handlePlayerEmail}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              autoComplete={`player${counter}score`}
              id={`player${counter}score`}
              label={`Player ${counter} Score`}
              name={`${counter - 1}`}
              onChange={handlePlayerScore}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel onClick={handlePlayerWin}name={`${counter - 1}`}control={<Checkbox />} label={`👑  Player ${counter} Wins 👑`} />
          </Grid>
        </>
      );
      });
    return displayedPlayers;
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onSubmit={handleSubmit}
          >
            <Typography component="h1" variant="h5">
              Add New Game
            </Typography>

            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    autoComplete="game-name"
                    name="name"
                    id="gameName"
                    label="Game"
                    autoFocus
                    onChange={(e) => setGameInput(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    autoComplete="match-date"
                    id="matchDate"
                    label="Date of Game"
                    name="date"
                    onChange={(e) => setDateInput(e.target.value)}
                  />
                </Grid>

                {spawnPlayers()}

                <Grid item xs={6}>
                  <Button
                    small
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={addPlayer}
                  >
                    Add Player
                  </Button>
                </Grid>

                <Grid item xs={6}>
                  <Button
                    small
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={removePlayer}
                  >
                    Remove Player
                  </Button>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add New Game
                </Button>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

const theme = createTheme();

export default AddNewGame;
