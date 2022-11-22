import './App.css';
import BuzzerButton from './BuzzerButton';
import NameBox from './NameBox.js';
import { useState } from "react";
import uuid from "react-uuid";

function App() {

  const [userName, setUserName] = useState('');

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
          userName={userName}
          userId={userId}
          isEnabled={userName.trim() !== ""}
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

export default App;
