import './App.css';
import { useState } from "react";
import { addDoc, collection } from 'firebase/firestore';

import EditScreen from './screen/EditScreen';
import RoomListScreen from './screen/RoomListScreen';
import AdminScreen from './screen/AdminScreen';
import ButtonScreen from './screen/ButtonScreen';
import ErrorScreen from './screen/ErrorScreen';
import BuzzListScreen from './screen/BuzzListScreen';
import firestoreDb from './firebase-config';
import uuid from 'react-uuid';

function App() {
  const [userName, setNameState] = useState(() =>
    localStorage.getItem("name") || ""
  );
  const setUserName = (name) => {
    localStorage.setItem("name", name);
    setNameState(name);
  };
  let userId = localStorage.getItem("uuid") || (localStorage.setItem("uuid", uuid()) && localStorage.getItem("uuid"));
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");

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
    await addDoc(collection(firestoreDb, "rooms"), {
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
      render={({ buzzes, setBuzzes }) => <AdminScreen
        buzzes={buzzes}
        onDeleteRoom={onExitClick}
        roomId={roomId}
        setBuzzes={setBuzzes}
      />}
      roomId={roomId}
      userId={userId}
    />
  } else {
    room = <BuzzListScreen
      render={({ buzzes, isEnabled }) => <ButtonScreen
        buzzes={buzzes}
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