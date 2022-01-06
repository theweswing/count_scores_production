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
    console.log(`${date}: Is winner: ${playerWinner}`);
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
        >
          <TableCell>{`👑 ${player.name} 👑`}</TableCell>
          <TableCell>{`${player.score} 👑`}</TableCell>
        </TableRow>
      );
    } else {
      return (
        <TableRow
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          key={player.id}
        >
          <TableCell>{player.name}</TableCell>
          <TableCell>{player.score}</TableCell>
        </TableRow>
      );
    }
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
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
          <TableHead>
            <TableRow>
              <TableCell>Players</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
        ) : null}

        {open ? <TableBody>{mapPlayers}</TableBody> : null}
      </Table>
    </TableContainer>
  );
};

export default MatchCard;
