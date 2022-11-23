import './App.css';
import Room from '../Room/Room'
import { useState } from "react";
import uuid from "react-uuid";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import RoomList from '../RoomList/RoomList';

function App() {
  let userId = localStorage.getItem("uuid")
  if (!userId) {
    localStorage.setItem("uuid", uuid());
    userId = localStorage.getItem("uuid");
  }
  const [roomId, setRoomId] = useState('');

  const app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  });

  const db = getFirestore(app);

  if (roomId) {
    return (
      <Room
        db={db}
        roomId={roomId}
        userId={userId}
      ></Room>
    );
  } else {
    return (
      <RoomList
        db={db}
        userId={userId}
        setRoomId={setRoomId}
      ></RoomList>
    )
  }
}

export default App;
