import { collection, deleteDoc, doc, getDocs, query, onSnapshot, where, orderBy } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import BuzzerButton from "../view/BuzzerButton";
import BuzzList from "../view/BuzzList";
import Header from "../view/Header";
import "./AdminScreen.css";

function AdminScreen({ db, roomId, onDeleteRoom }) {
    const [roomName, setRoomName] = useState("");
    const [buzzes, setBuzzes] = useState([]);
    const roomDocId = useRef("");

    useEffect(() => {
        const fetchData = async function () {
            const q = query(collection(db, "rooms"), where("roomId", "==", roomId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                roomDocId.current = doc.id;
                setRoomName(doc.data().roomName);
            });
        };
        fetchData();
    }, [db, roomId]);

    useEffect(() => {
        const buzzDoc = collection(db, "buzzes");
        const whereClause = where("roomId", "==", roomId);
        const order = orderBy("ts");
        const buzzQuery = query(buzzDoc, whereClause, order);
        const queryCallback = (buzz) => {
            const mappedBuzzes = [];
            buzz.docs.forEach((buzzesDoc) => {
                const data = buzzesDoc.data();
                const ts = data.ts ? new Date(data.ts.toMillis()).toLocaleString() : "";
                mappedBuzzes.push({
                    "id": buzzesDoc.id,
                    "userName": data.userName,
                    "ts": ts
                });
            });
            setBuzzes(mappedBuzzes);
        };
        const unsub = onSnapshot(buzzQuery, queryCallback);

        return () => {
            unsub();
        };
    }, [db, roomId]);

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

    const onClear = async function () {
        const clearRoom = async function () {
            const q = query(collection(db, "buzzes"), where("roomId", "==", roomId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((buzz) => {
                deleteDoc(doc(db, "buzzes", buzz.id));
            });
            setBuzzes([]);
        };
        clearRoom();
    };

    return <div
        className="adminScreen-wrapper">
        <Header
            isAdmin={true}
            title={roomName}
            name="Admin"
            onExit={onExit}
            onNameClear={onNameChange} />
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