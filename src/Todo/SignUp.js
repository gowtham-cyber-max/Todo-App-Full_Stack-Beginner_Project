import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth} from "./Backend/firebase";


const defaultTheme = createTheme();

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [hash, setHash] = useState("");
  const [visi, setVisi] = useState(false);
  const navi = useNavigate();

      const handleSubmit = async(event) => {
        event.preventDefault();
        try{
              await createUserWithEmailAndPassword(auth,username,hash);
                navi("/");
                console.log("hi");
        }
        catch(e){
          console.log(e);
        }
      };
      

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: "green" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              id="email"
              label="Email Address/username"
              name="email"
              fullwidth={true}
              autoComplete="email"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              name="password"
              label="Password"
              type={visi ? "text" : "password"}
              id="password"
              fullwidth={true}
              autoComplete="current-password"
              value={hash}
              onChange={(e) => {
                setHash(e.target.value);
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={visi}
                  onClick={() => setVisi(!visi)}
                  color="success"
                />
              }
              label="Show Password"
            />
            <Button
              type="submit"
              onSubmit={handleSubmit}
              fullwidth={true}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
