import BuzzerButton from '../BuzzerButton/BuzzerButton';
import NameBox from '../NameBox/NameBox.js';
import { useState } from "react";

function Room({ db, roomId, userId }) {

    const [userName, setUserName] = useState('');
    
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

export default Room;