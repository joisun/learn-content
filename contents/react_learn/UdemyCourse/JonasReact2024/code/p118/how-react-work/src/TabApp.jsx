/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";
function Card() {
    return (
        <div className="card">
            <p>Hello</p>
            <p>React!</p>
        </div>
    );
}
function TabList({ activeTab, setActiveTab }) {
    const tabs = [1, 2, 3, 4];
    return (
        <div className="tab-list">
            {tabs.map((i) => {
                return (
                    <div
                        className="tab"
                        key={i}
                        onClick={() => setActiveTab(i)}
                        style={{
                            backgroundColor:
                                activeTab === i ? "purple" : "#444",
                        }}
                    >
                        {i}
                    </div>
                );
            })}
        </div>
    );
}
function Score() {
    const [count, setCount] = useState(0);
    return (
        <div className="scorer">
            <button className="minus" onClick={() => setCount(count - 1)}>
                Minus
            </button>
            <span>{count}</span>
            <button className="add" onClick={() => setCount(count + 1)}>
                Add
            </button>
        </div>
    );
}

function Content({ activeTab }) {
    const [state, setState] = useState("hello");
    const TabContentData = {
        1: "Consequatur accusamus error omnis quo id.",
        2: "Perferendis et unde.",
        3: "Dolores inventore ea doloremque.",
    };
    return (
        <div>
            <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
            />
            <p>{TabContentData[activeTab]} </p>
        </div>
    );
}
function BlankNotice() {
    return <p>No score for this!</p>;
}
export default function App() {
    const [activeTab, setActiveTab] = useState(1);
    return (
        <div className="container">
            <TabList {...{ activeTab, setActiveTab }} />
            <div className="tab-content">
                <Content key={activeTab} activeTab={activeTab} />
                <div className="score-footer">
                    {activeTab < 4 ? (
                        <Score key={activeTab} />
                    ) : (
                        <BlankNotice />
                    )}
                </div>
            </div>
        </div>
    );
}
