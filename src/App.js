import './App.css';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
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

  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
      <button>Sign Out</button>
      <h2>User name: {user.displayName}</h2>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt="user img" />
    </div>
  );
}

export default App;
