import "./ExitButton.css";

function ExitButton({ onClick }) {
    return <div className="ExitButton-button"
        onClick={() => onClick()}>
        X
    </div>;
}

export default ExitButton;