import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const SignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [setSignUp, setSetSignUp] = useState("");
  const [errors, setErrors] = useState("");

  const checkEmail = () => {
    if (
      String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setEmailValid(true);
      return emailValid;
    } else {
      setEmailValid((emailValid) => !emailValid);
    }
  };

  const checkPassword = () => {
    if (password === passwordRepeat) {
      setPasswordMatch(true);
      return passwordMatch;
    } else {
      setPasswordMatch((passwordMatch) => !passwordMatch);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkEmail();
    checkPassword();

    if (checkEmail && checkPassword) {
      const user = {
        first_name: firstname,
        last_name: lastname,
        email,
        username,
        password,
      };


      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => console.log(data));
        } else {
          res.json().then((errors) => console.log(errors));
        }
      });

      setFirstname("");
      setLastname("");
      setEmail("");
      setUsername("");
      setPassword("");
      setPasswordRepeat("");

      e.target.reset();
    }
  };

  return (
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
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  autoComplete="given-name"
                  name="firstname"
                  id="firstname"
                  label="First name"
                  autoFocus
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  autoComplete="family-name"
                  id="lastName"
                  label="Last Name"
                  name="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                {emailValid ? (
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <TextField
                    error
                    required
                    fullWidth
                    id="filled-error-helper-text"
                    label="Email Address"
                    helperText="Must be a valid email containing '@'"
                    variant="filled"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  autoComplete="username"
                  id="username"
                  label="Username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                {passwordMatch ? (
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                ) : (
                  <TextField
                    error
                    required
                    fullWidth
                    id="filled-error-helper-text"
                    label="Password"
                    helperText="Passwords don't match, please try again"
                    variant="filled"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                {passwordMatch ? (
                  <TextField
                    required
                    fullWidth
                    name="password-match"
                    label="Type Password Again"
                    type="password"
                    id="password-match"
                    autoComplete="new-password-match"
                    value={passwordRepeat}
                    onChange={(e) => setPasswordRepeat(e.target.value)}
                  />
                ) : (
                  <TextField
                    error
                    required
                    fullWidth
                    id="filled-error-helper-text"
                    label="Type Password Again"
                    helperText="Passwords don't match, please try again"
                    variant="filled"
                    type="password"
                    value={passwordRepeat}
                    onChange={(e) => setPasswordRepeat(e.target.value)}
                  />
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Score Counter
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const theme = createTheme();

export default SignUp;
