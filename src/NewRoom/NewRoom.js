import { addDoc, collection } from "firebase/firestore";
import { createRef } from "react";

function NewRoom({ db, setNewRoom, userId, setRoomId }) {

    const inputRef = createRef();

    return (
        <div>
            <input
                className="NewRoom-input"
                ref={inputRef}
                type="text"
            ></input>
            <button
                onClick={() => {
                    setNewRoom(false);
                }}
            >
                Cancel
            </button>
            <button
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
    );
}

export default NewRoom;