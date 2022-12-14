import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import BuzzerButton from "../view/BuzzerButton";
import BuzzList from "../view/BuzzList";
import Header from "../view/Header";
import "./AdminScreen.css";

function AdminScreen({ buzzes, db, onDeleteRoom, roomId, setBuzzes }) {
    const [roomName, setRoomName] = useState("");
    const roomDocId = useRef("");

    useEffect(() => {
        (async function () {
            const q = query(collection(db, "rooms"), where("roomId", "==", roomId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                roomDocId.current = doc.id;
                setRoomName(doc.data().roomName);
            });
        })();
    }, [db, roomId]);

    const onExit = async function () {
        (async function () {
            await onClear();
            deleteDoc(doc(db, "rooms", roomDocId.current));
            roomDocId.current = "";
        })();
        onDeleteRoom();
    };

    const onClear = async function () {
        (async function () {
            const q = query(collection(db, "buzzes"), where("roomId", "==", roomId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((buzz) => {
                deleteDoc(doc(db, "buzzes", buzz.id));
            });
            setBuzzes([]);
        })();
    };

    return <div
        className="adminScreen-wrapper">
        <Header
            isAdmin={true}
            title={roomName}
            name="Admin"
            onExit={onExit} />
        <div
            className="adminScreen-content">
            <BuzzerButton
                enabledText="CLEAR"
                disabledText="DISABLED"
                isEnabled={true}
                onClick={onClear} />
            <BuzzList
                buzzes={buzzes} />
        </div>
    </div>;
}

export default AdminScreen;