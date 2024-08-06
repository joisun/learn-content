import "./FlashCardApp.css";
import { useState } from "react";
function FlashCard({ q, a }) {
    const [toggle, setToggle] = useState(false);
    const handleClick = () => {
        setToggle(!toggle);
    };
    return (
        <>
            <div
                className="card"
                onClick={handleClick}
                style={{ background: toggle ? "red" : "#444" }}
            >
                {toggle ? a : q}
            </div>
        </>
    );
}

export default function App() {
    const data = [
        { q: "What language is React based on?", a: "JavaScript" },
        { q: "What are the building blocks of React apps?", a: "Component" },
        {
            q: "What's the name of the syntax we use to describe a UI in React?",
            a: "JSX",
        },
        { q: "How to pass data from parent to child components?", a: "Props" },
        { q: "How to give components memory?", a: "useState hook" },
        {
            q: "What do we call an input element that is completely synchronised with state?",
            a: "Controlled element",
        },
    ];
    return (
        <div className="card-list">
            {data.map((item) => {
                return <FlashCard key={item.q} q={item.q} a={item.a} />;
            })}
        </div>
    );
}
