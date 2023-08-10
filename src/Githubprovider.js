// NewProviderAuth.js
import { signInWithPopup, providerName, getAuth, GithubAuthProvider } from 'firebase/auth';
import app from './Service/firebase.config';

function Githubprovider() {
    const auth=getAuth(app)
  const handleSignIn = async () => {
    const provider = new GithubAuthProvider(); 
    try {
      await signInWithPopup(auth, provider);
      
    } catch (error) {
      console.error('Error signing in with the new provider:', error);
    }
  };

  return (
    <button onClick={handleSignIn}>Sign in with the github provider</button>
  );
}

export default Githubprovider;
