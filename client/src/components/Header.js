import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Header = ({ setUser, setClickFind, setAddNew }) => {
  const handleLogout = () => {
    setUser(null);
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const goHome = () => {
    setClickFind(true);
    setAddNew(true);
  };

  return (
    <AppBar position="static" sx={{ p: 2 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            onClick={goHome}
          >
            CountScores
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* <Link to="/games">
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                My Games
              </Button>
            </Link> */}

            {/* <Link to="/addnew">
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Add New Game
              </Button>
            </Link> */}

            <Link to="/">
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={goHome}
              >
                Home
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
