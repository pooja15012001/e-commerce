
import React from "react";
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { app } from "./Service/firebase.config";
import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";

export default function Facebookauth() {
  const auth = getAuth(app);

  const handleSignIn = async () => {
    const provider = new FacebookAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      // Handle the authentication result here
      console.log("Google sign-in success:", result.user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };
  return (
    <div>
      <div class="input-container" style={{border:"2px solid rgba(58, 89, 152, 1) "}}>
        <i class=" icon"style={{background: "rgba(36, 59, 104, 1)"
}} >
          {" "}
          <GoogleIcon />
          
        </i>
        <Button
          class="input-field"
          placeholder="Log in with Goggle"
          onClick={handleSignIn}
          style={{background: "rgba(58, 89, 152, 1)"
          }}
        >
          Log in with Facebook
        </Button>   
      </div>
    </div>
  );
}
