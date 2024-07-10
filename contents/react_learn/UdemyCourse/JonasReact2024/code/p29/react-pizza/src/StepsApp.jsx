import "./StepsApp.css";
import { useState } from "react";

export default function App() {
    const [current, setCurrent] = useState(1);
    const handleClick = (isNext) => {
        isNext ? setCurrent(current + 1) : setCurrent(current - 1);
    };
    return (
        <>
            <div className="steps">
                {[1, 2, 3].map((i) => {
                    return (
                        <div
                            className="step"
                            key={i}
                            style={{
                                backgroundColor:
                                    current === i ? "purple" : "gray",
                            }}
                        >
                            {i}
                        </div>
                    );
                })}
            </div>
            <div className="step-content">
                {
                    {
                        1: "Step1: Learn React",
                        2: "Step2: Apply for jobs",
                        3: "Step3: Invest your income",
                    }[current]
                }
            </div>
            <div className="btns">
                <button
                    disabled={current == 1}
                    type="button"
                    className="pre"
                    onClick={() => handleClick(false)}
                >
                    Previous
                </button>
                <button
                    disabled={current == 3}
                    type="button"
                    className="next"
                    onClick={() => handleClick(true)}
                >
                    Next
                </button>
            </div>
        </>
    );
}
