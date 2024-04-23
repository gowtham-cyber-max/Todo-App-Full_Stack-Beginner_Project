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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button'
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, gauth } from "./Backend/firebase";
const defaultTheme = createTheme();

 function Login() {
  const [username, setUsername] = useState("");
  const [hash, setHash] = useState("");
  const [visi, setVisi] = useState(false);
  const navi = useNavigate();
      const handleSubmit = async(event) => {
        event.preventDefault();
        try{
              await signInWithEmailAndPassword(auth,username,hash);
              if(auth.currentUser){
                navi("/Todo");
                console.log("hi");
              }
              else{
                console.log("else");
              }
            }
            catch (error) {
              if(error.code==='auth/invalid-email'){
                alert("Please Type Your Email");
              }
              if(error.code ==='auth/invalid-credential'){
                alert(" Invalid Username or  Password  , if you Dont have a account Please Sign Up");
              }
              if(error.code ==='auth/missing-password'){
                alert("Please Type Your Password");
              }
              
                console.log(error.message);
            }
           
      };
      const handleGoogle = async () => {
       try{
        await signInWithPopup(auth,gauth);
        if(auth.currentUser){
          navi("/Todo");
          console.log("hi");
        }
       }
       catch(error){
        console.error(error);
      }
        
      }
      
      
      return (
        <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          className="sign"
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
              Sign In
            </Button>
            <p>Or</p>
            <div>
            <GoogleButton
              onClick={handleGoogle}
              fullwidth={true}
              variant="contained"
              sx={{ mt: 3, mb: 5 }}

            />
           </div>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="#/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default Login;
