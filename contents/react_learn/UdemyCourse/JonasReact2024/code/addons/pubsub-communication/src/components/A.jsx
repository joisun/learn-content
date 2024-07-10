import Mitt from "../Mitt";
import { useState } from "react";

export default function A() {
    const [input, setInput] = useState();
    const handleInputChange = (e) => {
        setInput(e.target.value);
        Mitt.emit("hello", e.target.value);
    };
    return (
        <div className="comp-a">
            <input type="text" value={input} onChange={handleInputChange} />
        </div>
    );
}
