import ExitButton from "./ExitButton";
import "./Header.css";

function Header({ isAdmin, name, onExit, onNameClear, title }) {
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
                onClick={() => onNameClear && onNameClear()}
            >
                {name}
            </div>
        </div>
        <ExitButton
            isDelete={isAdmin}
            onClick={onExit}
        />
    </div>;
}

export default Header;