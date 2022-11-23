import logo from '../img/logo.svg';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import audio from "../audio/buzzer.wav";

function BuzzerButton({ db, userName, userId, isEnabled }) {

    async function imageClick(event) {
        if (isEnabled) {
            try {
                new Audio(audio).play();
                await addDoc(collection(db, "buzzes"), {
                    userName: userName,
                    userId: userId,
                    ts: serverTimestamp()
                });
                console.log("done");
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }

    return (
        <img
            src={logo}
            className="App-logo"
            alt="logo"
            onClick={imageClick}
        />
    );
}

export default BuzzerButton;