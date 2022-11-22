import "./NameBox.css";
import { createRef, useState } from "react";

function NameBox({ userName, setUserName }) {

  const [showEditName, setShowEditName] = useState('');
  const inputRef = createRef();

  function onClick() {
    setShowEditName(true);
  }

  function onSave() {
    setUserName(inputRef.current.value);
    setShowEditName(false);
  }

  if (!showEditName) {
    return (
      <div className="NameBox-wrapper">
        <div
          className={userName ? "NameBox-name" : "NameBox-name empty"}
          onClick={onClick}
        >
          {userName || "Click to edit your name"}
        </div>
      </div>
    );
  } else {
    return (
      <div className="NameBox-wrapper">
        <input
          className="NameBox-input"
          onChange={(e) => setUserName(e.target.value)}
          ref={inputRef}
          type="text"
          value={userName}
        >
        </input>
        <button
          className="NameBox-saveButton"
          onClick={onSave}
        >
          Save
        </button>
      </div>
    );
  }
}

export default NameBox;