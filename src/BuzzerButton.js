import logo from './logo.svg';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { initializeApp } from "firebase/app";

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

    async function buzz() {
        try {
            await addDoc(collection(db, "buzzes"), {
                userName: userName,
                userId: userId,
                ts: serverTimestamp()
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const imageClick = event => {
        if (isEnabled) {
            buzz()
                .then(() => { console.log("done"); });
        }
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

export default BuzzerButton;