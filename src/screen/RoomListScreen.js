import "./RoomListScreen.css"
import { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
import RoomListItem from "../view/RoomListItem";

function RoomListScreen({ db, userId, setRoomId }) {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        getDocs(collection(db, "rooms"))
            .then(docs => {
                let foundMatch = false;
                const rooms = [];
                docs.forEach(doc => {
                    if (doc.data.roomId === userId) {
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