import "./RoomListScreen.css"
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import RoomListItem from "../view/RoomListItem";

function RoomListScreen({ db, userId, setRoomId }) {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "rooms"), (docs) => {
            let foundMatch = false;
            const rooms = [];
            console.log(docs);
            docs.forEach(doc => {
                if (doc.data().roomId === userId) {
                    foundMatch = true;
                }
                rooms.push({
                    id: doc.data().roomId,
                    name: doc.data().roomName,
                    onClick: id => { setRoomId(id); }
                });
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
    }, []);

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