import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
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
    }, []);

    useEffect(() => {
        getDocs(collection(db, "buzzes"))
            .then(buzzesDocs => {
                const mappedBuzzes = [];
                buzzesDocs.forEach(buzzesDoc => {
                    const data = buzzesDoc.data();
                    mappedBuzzes.push({
                        "id": buzzesDoc.id,
                        "userName": data.userName,
                        "ts": data.ts.nt
                    });
                });
                return mappedBuzzes;
            })
            .then(mappedBuzzes => setBuzzes(mappedBuzzes));
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

    const buzzDivs = buzzes.map((buzz) => <div className="adminScreen-buzz" key={buzz.id}>
        <div>
            {buzz.userName}
        </div>
        <div>
            {buzz.ts}
        </div>
    </div>);

    return <div
        className="adminScreen-wrapper">
        <Header
            isAdmin={true}
            title={roomName}
            name="Admin"
            onExit={onExit}
            onNameClear={onNameChange}
        />
        <div
            className="adminScreen-content">
            <div
                className="adminScreen-buttonWrapper"
            >
                <button
                    className="adminScreen-button"
                    onClick={onClear}
                >
                    Clear
                </button>
            </div>
            <div
                className="adminScreen-buzzes">
                {buzzDivs}
            </div>
        </div>
    </div>;
}

export default AdminScreen;