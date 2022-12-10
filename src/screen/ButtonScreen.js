import BuzzerButton from "../view/BuzzerButton";
import { addDoc, collection, doc, getDocs, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore';
import "./ButtonScreen.css"
import { useEffect, useState } from "react";
import Header from "../view/Header";

function ButtonScreen({ db, onExitClick, onNameClear, roomId, setError, userName, userId }) {

    const [roomInfo, setRoomInfo] = useState({
        name: "",
        docId: ""
    });

    useEffect(() => {
        const fetchData = async function () {
            const q = query(collection(db, "rooms"), where("roomId", "==", roomId))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setRoomInfo({
                    name: doc.data().roomName,
                    docId: doc.id
                });
            });
        };
        fetchData();
    }, []);

    useEffect(() => {
        let unsub;
        const subscribeForUpdates = async function (docId) {
            unsub = onSnapshot(doc(db, "rooms", docId), (doc) => {
                if (!doc.data()) {
                    onExitClick();
                }
            });
        };
        if (roomInfo.docId) {
            subscribeForUpdates(roomInfo.docId);
        }
        return () => { unsub && unsub() };
    }, [roomInfo]);

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
            isAdmin={false}
            title={roomInfo.name}
            name={userName}
            onExit={onExitClick}
            onNameClear={onNameClear}
        />
        <BuzzerButton
            isEnabled={true}
            onClick={onButtonClick}
        />
        <div />
    </div>;
}

export default ButtonScreen;