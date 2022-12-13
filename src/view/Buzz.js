import "./Buzz.css"

const Buzz = ({userName, ts}) => <div className="buzz-buzz">
    <div>
        {userName}
    </div>
    <div>
        {ts}
    </div>
</div>

export default Buzz;