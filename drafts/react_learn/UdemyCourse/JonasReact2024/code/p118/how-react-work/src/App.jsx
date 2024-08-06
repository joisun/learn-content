import React, { useState } from "react";

const BatchingExample = () => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        // 在点击事件处理函数中执行多次状态更新
        setCount((prevCount) => prevCount + 1);
        setCount((prevCount) => prevCount + 2);
        setCount((prevCount) => prevCount + 3);
    };

    const handleAsyncOperation = () => {
        // 在异步操作中执行多次状态更新
        Promise.resolve().then(() => {
            setCount((prevCount) => prevCount + 1);
            setCount((prevCount) => prevCount + 2);
            setCount((prevCount) => prevCount + 3);
        });
    };

    const handleTimeout = () => {
        // 在setTimeout中执行多次状态更新
        setTimeout(() => {
            setCount((prevCount) => prevCount + 1);
            setCount((prevCount) => prevCount + 2);
            setCount((prevCount) => prevCount + 3);
        }, 1000);
    };

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={handleClick}>Update Count (Click)</button>
            <button onClick={handleAsyncOperation}>Update Count (Async)</button>
            <button onClick={handleTimeout}>Update Count (Timeout)</button>
        </div>
    );
};

export default BatchingExample;
