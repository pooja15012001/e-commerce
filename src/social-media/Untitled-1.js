// GoogleAuth.js
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "./Service/firebase.config";

function GoogleAuth() {
    
  const auth = getAuth(app);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      // Handle the authentication result here
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <button onClick={handleSignIn}>Sign in with Google</button>
  );
}

export default GoogleAuth;
