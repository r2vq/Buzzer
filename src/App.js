import './App.css';
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import uuid from "react-uuid";

import EditScreen from './screen/EditScreen';
import RoomListScreen from './screen/RoomListScreen';
import AdminScreen from './screen/AdminScreen';
import ButtonScreen from './screen/ButtonScreen';
import ErrorScreen from './screen/ErrorScreen';
import BuzzListScreen from './screen/BuzzListScreen';

function App() {
  const [userName, setNameState] = useState(() =>
    localStorage.getItem("name") || ""
  );
  const setUserName = (name) => {
    localStorage.setItem("name", name);
    setNameState(name);
  };
  const [userId] = useState(() => {
    let id = localStorage.getItem("uuid");
    if (!id) {
      id = uuid();
      localStorage.setItem("uuid", id);
    }
    return id;
  });
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");

  const app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  });

  const db = getFirestore(app);

  const onExitClick = () => {
    setRoomId("");
  };

  const onNameChanged = (name) => {
    setUserName(name);
  };

  const onNameClear = () => {
    setUserName("");
  }

  const onRoomCreated = async (name) => {
    await addDoc(collection(db, "rooms"), {
      roomId: userId,
      roomName: name
    });
    setRoomId(userId);
  }

  let room;
  if (error) {
    room = <ErrorScreen
      message={error}
    />
  } else if (userName === "") {
    room = <EditScreen
      hint="What is your name?"
      onSubmit={onNameChanged}
    />
  } else if (roomId === "") {
    room = <RoomListScreen
      db={db}
      userId={userId}
      setRoomId={setRoomId}
    />
  } else if (roomId === "NEW") {
    room = <EditScreen
      hint="Room Name"
      onSubmit={onRoomCreated}
    />
  } else if (roomId === userId) {
    room = <BuzzListScreen
      db={db}
      render={({ buzzes, setBuzzes }) => <AdminScreen
        buzzes={buzzes}
        db={db}
        onDeleteRoom={onExitClick}
        roomId={roomId}
        setBuzzes={setBuzzes}
      />}
      roomId={roomId}
      userId={userId}
    />
  } else {
    room = <BuzzListScreen
      db={db}
      render={({ buzzes, isEnabled }) => <ButtonScreen
        buzzes={buzzes}
        db={db}
        isEnabled={isEnabled}
        onExitClick={onExitClick}
        onNameClear={onNameClear}
        roomId={roomId}
        setError={setError}
        userName={userName}
        userId={userId}
      />}
      roomId={roomId}
      userId={userId}
    />
  }

  return room;
}

export default App;