import logo from '../img/logo.svg';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import audio from "../audio/buzzer.wav";

function BuzzerButton({ userName, userId, isEnabled }) {

    const app = initializeApp({
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID
    });

    const db = getFirestore(app);

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