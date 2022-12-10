import "./ExitButton.css";

function ExitButton({ isDelete, onClick }) {
    return <div
        className={(isDelete ? "ExitButton-delete" : "ExitButton-exit") + " ExitButton-button"}
        onClick={() => onClick()}>
        X
    </div>;
}

export default ExitButton;