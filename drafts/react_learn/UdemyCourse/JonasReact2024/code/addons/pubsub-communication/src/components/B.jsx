import { useState } from "react";
import Mitt from "../Mitt";
export default function B() {
    const [state, setState] = useState("-");
    Mitt.on("hello", (val) => {
        setState(val);
    });
    return (
        <div className="comp-b">
            <p>component b: {state}</p>
        </div>
    );
}
