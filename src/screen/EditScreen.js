import { useRef } from "react";
import "./EditScreen.css"

function EditScreen({ hint, onSubmit }) {

    const inputRef = useRef(null);

    return <div
        className="EditScreen-wrapper"
    >
        <input
            ref={inputRef}
            className="EditScreen-input"
            placeholder={hint}
        />
        <button
            className="EditScreen-saveButton"
            onClick={() => onSubmit(inputRef.current.value)}
        >
            Save
        </button>
    </div>;
}

export default EditScreen;