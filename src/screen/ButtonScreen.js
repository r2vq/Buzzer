import audio from "../audio/buzzer.wav";
import BuzzerButton from "../view/BuzzerButton";
import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import "./ButtonScreen.css"
import { useEffect, useState } from "react";
import Header from "../view/Header";
import BuzzList from "../view/BuzzList";

function ButtonScreen({ db, onExitClick, onNameClear, roomId, setError, userName, userId }) {
    const [roomInfo, setRoomInfo] = useState({
        name: "",
        docId: ""
    });
    const [buzzes, setBuzzes] = useState([]);

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
        const buzzDoc = collection(db, "buzzes");
        const whereClause = where("roomId", "==", roomId);
        const order = orderBy("ts");
        const buzzQuery = query(buzzDoc, whereClause, order);
        const queryCallback = (buzz) => {
            const mappedBuzzes = [];
            buzz.docs.forEach((buzzesDoc) => {
                const data = buzzesDoc.data();
                const ts = new Date(data.ts.toMillis()).toLocaleString();
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
        new Audio(audio).play();
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
        className="buzzerScreen-wrapper">
        <Header
            isAdmin={false}
            title={roomInfo.name}
            name={userName}
            onExit={onExitClick}
            onNameClear={onNameClear} />
        <div
            className="buzzerScreen-content">
            <BuzzerButton
                enabledText="Buzz in!"
                disabledText="Disabled"
                isEnabled={true}
                onClick={onButtonClick} />
            <BuzzList
                buzzes={buzzes} />
        </div>
    </div>;
}

export default ButtonScreen;