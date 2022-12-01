import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import Header from "../view/Header";
import "./AdminScreen.css";

function AdminScreen({ db, roomId, onDeleteRoom }) {
    const [roomName, setRoomName] = useState("");
    const roomDocId = useRef("");

    useEffect(() => {
        const fetchData = async function () {
            const q = query(collection(db, "rooms"), where("roomId", "==", roomId))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                roomDocId.current = doc.id;
                setRoomName(doc.data().roomName);
            });
        };
        fetchData();
    }, []);

    const onExit = async function () {
        const deleteRoom = async function () {
            deleteDoc(doc(db, "rooms", roomDocId.current));
            roomDocId.current = "";
        };
        deleteRoom();
        onDeleteRoom();
    };

    const onNameChange = async function () {
        // no-op
    };

    return <div>
        <Header
            title={roomName}
            name="Admin"
            onExit={onExit}
            onNameClear={onNameChange}
        />
    </div>;
}

export default AdminScreen;