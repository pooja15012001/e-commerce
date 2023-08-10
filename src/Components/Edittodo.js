// GoogleAuth.js
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../Service/firebase.config";

function GoogleAuth() {
  const auth = getAuth(app);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      // Handle the authentication result here

      // Send a postMessage to the opener window to request closing the popup
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage({ type: 'closePopup' }, window.location.origin);
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    } finally {
      // Display a message to the user indicating the sign-in status
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage({ type: 'signInStatus', success: true }, window.location.origin);
      } else {
        console.warn('Unable to communicate sign-in status to the main window.');
      }
    }
  };

  return (
    <button onClick={handleSignIn}>Sign in with Google</button>
  );
}

export default GoogleAuth;
