import "./RoomList.css"
import NewRoom from "../NewRoom/NewRoom"
import { useEffect, useState } from "react";
import { collection, doc, getDocs, where, onSnapshot, query } from 'firebase/firestore';

function RoomList({ db, userId, setRoomId }) {
    const [newRoom, setNewRoom] = useState(false);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        getDocs(collection(db, "rooms"))
            .then((t) => {
                const rooms = [];
                t.forEach((doc) => {
                    if (doc.data().roomId === userId) {
                        setRoomId(userId);
                    } else {
                        rooms.push({
                            id: doc.data().roomId,
                            name: doc.data().roomName
                        });
                    }
                });
                setRooms(rooms);
            });
    }, []);

    let mappedRooms = [{
        id: userId,
        name: "Create Room",
        onClick: () => {
            setNewRoom(true);
        }
    }]
        .concat(rooms)
        .map((room) =>
            <div
                className="RoomList-item"
                key={room.id}
                onClick={room.onClick || (() => { setRoomId(room.id) })}
            >
                {room.name}
            </div>
        );

    if (newRoom) {
        return (
            <NewRoom
                db={db}
                setNewRoom={setNewRoom}
                userId={userId}
                setRoomId={setRoomId}
            ></NewRoom>
        );
    } else {
        return (
            <div>
                {mappedRooms}
            </div>
        );
    }
}

export default RoomList;