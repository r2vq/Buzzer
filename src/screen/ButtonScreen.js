import BuzzerButton from "../view/BuzzerButton";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import "./ButtonScreen.css"
import { useEffect, useState } from "react";
import Header from "../view/Header";

function ButtonScreen({ db, onExitClick, roomId, setError, userName, userId }) {

    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        const fetchData = async function () {
            const q = query(collection(db, "rooms"), where("roomId", "==", roomId))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setRoomName(doc.data().roomName);
            });
        };
        fetchData();
    }, []);

    const onButtonClick = async () => {
        try {
            await addDoc(collection(db, "buzzes"), {
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
        className="ButtonScreen-wrapper"
    >
        <Header
            title={roomName}
            name={userName}
            onExit={onExitClick}
        />
        <BuzzerButton
            isEnabled={true}
            onClick={onButtonClick}
        />
        <div />
    </div>;
}

export default ButtonScreen;