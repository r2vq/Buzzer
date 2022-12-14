import ExitButton from "./ExitButton";
import "./Header.css";

function Header({ isAdmin, name, onExit, onClick, title }) {
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
                onClick={() => onClick && onClick()}
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