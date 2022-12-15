import "./RoomListScreen.css"
import { useEffect, useState } from "react";
import { collection, onSnapshot } from 'firebase/firestore';
import RoomListItem from "../view/RoomListItem";
import firestoreDb from "../firebase-config";

function RoomListScreen({ userId, setRoomId }) {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(collection(firestoreDb, "rooms"), ({ docs }) => {
            let foundMatch = false;
            const rooms = Array.prototype.map.call(docs, doc => {
                if (doc.data().roomId === userId) {
                    foundMatch = true;
                }
                return {
                    id: doc.data().roomId,
                    name: doc.data().roomName,
                    onClick: id => { setRoomId(id); }
                };
            });
            if (foundMatch) {
                setRoomId(userId);
            } else {
                setRooms(rooms);
            }
        });

        return () => {
            unsub();
        };
    }, [setRoomId, userId]);

    let mappedRooms = [
        {
            id: "CREATE ROOM",
            name: "Create Room",
            onClick: () => setRoomId("NEW")
        }
    ]
        .concat(rooms)
        .map(roomState => (
            <RoomListItem
                key={roomState.id}
                onClick={() => roomState.onClick(roomState.id)}
                text={roomState.name}
            />
        ));

    return <div>
        {mappedRooms}
    </div>;
}

export default RoomListScreen;