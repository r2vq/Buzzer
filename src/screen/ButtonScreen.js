import audio from "../audio/buzzer.wav";
import BuzzerButton from "../view/BuzzerButton";
import { addDoc, collection, doc, getDocs, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore';
import "./ButtonScreen.css"
import { useEffect, useState } from "react";
import Header from "../view/Header";
import BuzzList from "../view/BuzzList";
import firestoreDb from "../firebase-config";

function ButtonScreen({ buzzes, isEnabled, onExitClick, onNameClear, roomId, setError, userName, userId }) {
    const [roomInfo, setRoomInfo] = useState({
        name: "",
        docId: ""
    });

    useEffect(() => {
        (async function () {
            const q = query(collection(firestoreDb, "rooms"), where("roomId", "==", roomId))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setRoomInfo({
                    name: doc.data().roomName,
                    docId: doc.id
                });
            });
        })();
    }, [roomId]);

    useEffect(() => {
        let unsub;
        if (roomInfo.docId) {
            (async function (docId) {
                unsub = onSnapshot(doc(firestoreDb, "rooms", docId), (doc) => {
                    if (!doc.data()) {
                        onExitClick();
                    }
                });
            })(roomInfo.docId);
        }
        return () => { unsub && unsub() };
    }, [onExitClick, roomInfo]);

    const onButtonClick = async () => {
        new Audio(audio).play();
        try {
            await addDoc(collection(firestoreDb, "buzzes"), {
                roomId: roomId,
                ts: serverTimestamp(),
                userName: userName,
                userId: userId,
            });
        } catch (e) {
            setError(e);
        }
    };

    return <div
        className="buzzerScreen-wrapper">
        <Header
            isAdmin={false}
            title={roomInfo.name}
            name={userName}
            onExit={onExitClick}
            onClick={onNameClear} />
        <div
            className="buzzerScreen-content">
            <BuzzerButton
                enabledText="Buzz in!"
                disabledText="Disabled"
                isEnabled={isEnabled}
                onClick={onButtonClick} />
            <BuzzList
                buzzes={buzzes} />
        </div>
    </div>;
}

export default ButtonScreen;