import { addDoc, collection } from "firebase/firestore";
import { createRef } from "react";
import "./NewRoom.css";

function NewRoom({ db, setNewRoom, userId, setRoomId }) {

    const inputRef = createRef();

    return (
        <div
            className="NewRoom-container"
        >
            Create a new room:
            <input
                className="NewRoom-input"
                placeholder="Room Name"
                ref={inputRef}
                type="text"
            ></input>
            <div class="NewRoom-buttons">
                <button
                    className="NewRoom-button"
                    onClick={() => {
                        setNewRoom(false);
                    }}
                >
                    Cancel
                </button>
                <button
                    className="NewRoom-button"
                    onClick={async () => {
                        await addDoc(collection(db, "rooms"), {
                            roomName: inputRef.current.value,
                            roomId: userId
                        });
                        setRoomId(userId);
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    );
}

export default NewRoom;