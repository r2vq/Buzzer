import "./RoomListItem.css";

function RoomListItem({ onClick, text }) {
    return (
        <div
            className="RoomListItem-wrapper"
            onClick={onClick}
        >
            {text}
        </div>
    );
}

export default RoomListItem;