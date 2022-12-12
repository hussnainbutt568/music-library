import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import axios from "axios";
import { baseUrl } from "./helpers/config";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [userName, setuserName] = React.useState("");
  const [password, setpassword] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  const handleSignIn = async () => {
    const body = {
      username: userName,
      password: password,
    };
    const response = await axios
      .post(`${baseUrl}/login`, body)
      .then((resp) => {
        const value = resp.data.Authorization;
        localStorage.setItem("login", JSON.stringify(value));
        window.location.replace("/");
      })
      .catch((err) => {});
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              mt: 1,
              backgroundColor: "white",
              mr: 10,
              ml: 10,
              width: "100%",
              height: "100%",
              mb: 50,
              boxShadow: 4,
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                mt: 5,
                mr: 10,
                ml: 12,
                width: "50%",
                justifyContent: "center",
              }}
            >
              <input
                margin="normal"
                name="password"
                label="Password"
                placeholder="User Name"
                className="Email-field"
                value={userName}
                onChange={(text) => setuserName(text.target.value)}
              />
            </Box>

            <Box sx={{ mt: 0.5, mr: 10, ml: 12, width: "50%" }}>
              <input
                margin="normal"
                name="password"
                label="Password"
                placeholder="Password"
                className="Email-field"
                value={password}
                onChange={(text) => setpassword(text.target.value)}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 1,
              }}
            >
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "40%", justifyContent: "center" }}
                onClick={() => handleSignIn()}
              >
                Sign In
              </Button>
            </Box>

            <Grid container direction="column">
              <Grid
                item
                xs
                sx={{
                  color: "black",
                  text: "white",
                }}
              >
                <Link
                  href="#"
                  variant="body2"
                  sx={{ color: "black", textDecoration: "none" }}
                >
                  Forgot password?
                </Link>
              </Grid>
             
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
