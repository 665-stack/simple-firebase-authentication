import './App.css';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import app from './firebase.init';
import { useState } from 'react';

const auth = getAuth(app);


function App() {

  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user);
      })
      .catch(error => {
        console.error(error);
      })
  }
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
      {/* mane email thakle sign out button dekhabe, r email na thakle sign in button dekhabe */}
      {
        user.email ? <button onClick={handleSignOut}>Sign Out</button> :
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
      }

      <h2>User name: {user.displayName}</h2>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt="user img" />
    </div>
  );
}

export default App;
