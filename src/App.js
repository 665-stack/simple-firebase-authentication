import './App.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import app from './firebase.init';
import { useState } from 'react';

const auth = getAuth(app);


function App() {

  const [user, setUser] = useState({});

  // Providers
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();


  // sign in
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user);
      })
      .catch(error => {
        console.error(error);
      })
  }
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user);
      })
      .catch(error => {
        console.error(error);
      })
  }

  // sign out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })

      .catch(error => {
        console.log(error);
      })
  }


  return (
    <div className="App">
      {/* mane email thakle sign out button dekhabe, r email na thakle sign in button dekhabe. akhane google and github duitar button e akshathe deya hoice. karon nalohe ternary operation calano jabe na */}

      {
        user.uid ? <>
          <button onClick={handleSignOut}>Sign Out</button>
        </> :
          <>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
            <button onClick={handleGithubSignIn}>Github Sign In</button>
          </>
      }

      <h2>User name: {user.displayName}</h2>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt="user img" />
    </div>
  );
}

export default App;
