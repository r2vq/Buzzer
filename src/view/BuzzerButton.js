import logo from '../img/logo.svg';
import audio from "../audio/buzzer.wav";

function BuzzerButton({ db, userName, userId, isEnabled, onClick }) {

    async function buttonClick(event) {
        if (isEnabled) {
            new Audio(audio).play();
            onClick();
        }
    }

    return (
        <img
            src={logo}
            className="App-logo"
            alt="logo"
            onClick={buttonClick}
        />
    );
}

export default BuzzerButton;