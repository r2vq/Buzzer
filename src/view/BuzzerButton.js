import "./BuzzerButton.css"

function BuzzerButton({ enabledText, disabledText, isEnabled, onClick }) {

    async function buttonClick(event) {
        if (isEnabled) {
            onClick();
        }
    }

    return (
        <div
            className="buzzerButton-buttonWrapper"
        >
            <button
                className={"buzzerButton-button" + (isEnabled ? " enabled" : " disabled")}
                onClick={buttonClick}
            >
                {isEnabled ? enabledText : disabledText}
            </button>
        </div>
    );
}

export default BuzzerButton;