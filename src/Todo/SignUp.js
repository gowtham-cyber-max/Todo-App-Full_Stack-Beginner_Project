import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth} from "./Backend/firebase";
import "./SignUp.css";
import Button from "@mui/material/Button";



export default function SignUp() {
  const [username, setUsername] = useState("");
  const [hash, setHash] = useState("");
  const navi = useNavigate();

      const handleSubmit = async(event) => {
        event.preventDefault();
        try{
              await createUserWithEmailAndPassword(auth,username,hash);
                navi("/");
                console.log("hi");
        }
        catch(e){
          console.log(e.code);
          if(e.code==='auth/email-already-in-use')
          {alert("Email is Exist");
          setHash("");
          setUsername("");}
          else if(e.code==='auth/invalid-email')
          {alert("Invalid Email");
          setHash("");
          setUsername("");}
          if(e.code ==='auth/missing-password'){
                alert("Please Type Your Password");
              }
              
        }
      };
      

  return (
   <div className="sign-up-body">
   <div className="sign-up-container">

   <div>

    <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
          />
   </div>       
   <div>
            <input
              
              value={hash}
              onChange={(e) => {
                setHash(e.target.value);
              }}
            />
   </div>       
   <div>
            
           
              
            <Button size="small" type="submit" variant="contained" color="success" onSubmit={handleSubmit}>
          Register       </Button>
          
   </div>       
   </div>
   </div>
  );
}
