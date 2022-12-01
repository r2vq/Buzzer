import "./ExitButton.css";

function ExitButton({ onClick }) {
    return <div
        className="ExitButton-wrapper"
        onClick={() => onClick()}
    >
        Exit
    </div>;
}

export default ExitButton;