import logo from './logo.svg';
import './App.css';
import NameBox from './NameBox.js';
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import uuid from "react-uuid";

function App() {

  const [userName, setUserName] = useState('');

  const app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  });

  const db = getFirestore(app);

  let userId = localStorage.getItem("uuid")
  if (!userId) {
    localStorage.setItem("uuid", uuid());
    userId = localStorage.getItem("uuid");
  }

  return (
    <div className="App">
      <header className="App-header">
        <NameBox
          userName={userName}
          setUserName={setUserName}
        ></NameBox>
      </header>
      <main className="App-main">
        <BuzzerButton
          db={db}
          userName={userName}
          userId={userId}
        ></BuzzerButton>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </main>
    </div>
  );
}

function BuzzerButton({ db, userName, userId }) {

  async function buzz() {
    try {
      await addDoc(collection(db, "buzzes"), {
        userName: userName,
        userId: userId
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const imageClick = event => {
    buzz()
      .then(() => { console.log("done"); });
  };

  return (
    <img
      src={logo}
      className="App-logo"
      alt="logo"
      onClick={imageClick}
    />
  );
}

export default App;
