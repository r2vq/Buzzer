import Buzz from "./Buzz";
import "./BuzzList.css";

const BuzzList = ({ buzzes }) => <div
    className="buzzList-buzzes"
>
    {buzzes.map(buzz => <Buzz
        key={buzz.id}
        userName={buzz.userName}
        ts={buzz.ts}
    />)}
</div>

export default BuzzList;