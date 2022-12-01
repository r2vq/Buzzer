import ExitButton from "./ExitButton";
import "./Header.css";

function Header({ name, onExit, onNameClear, title }) {
    return <div
        className="Header-wrapper"
    >
        <div
            className="Header-text"
        >
            <div
                className="Header-title"
            >
                {title}
            </div>
            <div
                className="Header-name"
                onClick={() => onNameClear()}
            >
                {name}
            </div>
        </div>
        <ExitButton
            onClick={onExit}
        />
    </div>;
}

export default Header;