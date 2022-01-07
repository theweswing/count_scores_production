import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";

const MatchCard = ({ date, players, user }) => {
  const [open, setOpen] = useState(false);
  const [playerWinner, setPlayerWinner] = useState(false);

  const isSelfWinner = () => {
    players.map((player) => {
      if (player.user_id === user.id && player.is_winner === true) {
        setPlayerWinner(true);
      }
    });
  };

  useEffect(() => {
    isSelfWinner();
  }, []);

  const mapPlayers = players.map((player) => {
    if (player.is_winner === true) {
      return (
        <TableRow
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          key={player.id}
          align="center"
        >
          <TableCell align="center">{`👑 ${player.name} 👑`}</TableCell>
          <TableCell align="center">{`${player.score} 👑`}</TableCell>
        </TableRow>
      );
    } else {
      return (
        <TableRow
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          key={player.id}
          align="center"
        >
          <TableCell align="center">{player.name}</TableCell>
          <TableCell align="center">{player.score}</TableCell>
        </TableRow>
      );
    }
  });

  return (
    <Box
      container
      noValidate
      sx={{ mt: 3 }}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <TableContainer component={Paper} sx={{ maxWidth: 750 }} align="center">
        <Table sx={{ minWidth: 400 }} aria-label="simple table" align="center">
          <TableHead align="center">
            <TableRow align="center">
              <TableCell align="center">
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                {playerWinner
                  ? `👑 Date of Game: ${date} 👑`
                  : `Date of Game: ${date}`}
              </TableCell>
            </TableRow>
          </TableHead>

          {open ? (
            <TableHead align="center">
              <TableRow align="center">
                <TableCell align="center">Players</TableCell>
                <TableCell align="center">Score</TableCell>
              </TableRow>
            </TableHead>
          ) : null}

          {open ? <TableBody align="center">{mapPlayers}</TableBody> : null}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MatchCard;
