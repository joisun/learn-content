/* eslint-disable react/prop-types */
import { useState } from "react";
import "./CheckListApp.css";

function Banner() {
    return (
        <>
            <div className="banner">
                <div>🌴FAR AWAY TODO💼</div>
            </div>
        </>
    );
}

function Appender(props) {
    return (
        <div className="appender">
            <span>What do you need for your 😎 trip? </span>
            <select className="select" onChange={props.handleSelect}>
                {new Array(20).fill(0).map((item, i) => {
                    return (
                        <option value={i + 1} key={i}>
                            {i + 1}
                        </option>
                    );
                })}
            </select>
            <input className="input" type="text" onInput={props.handleInput} />
            <button type="button" className="add" onClick={props.handleAdd}>
                ADD
            </button>
        </div>
    );
}
function TaskList({ list, handleCheck, handleDelete }) {
    return (
        <div className="list">
            {Object.entries(list).map(([key, val]) => {
                return (
                    <div className="list-item" key={key}>
                        <span>{val.done}</span>
                        <input
                            type="checkbox"
                            checked={val.done}
                            onChange={handleCheck}
                            name={key}
                        />
                        <span
                            style={{
                                textDecoration: val.done
                                    ? "line-through"
                                    : "none",
                            }}
                        >
                            {val.count} {key}
                        </span>
                        <span
                            onClick={() => handleDelete(key)}
                            className="close"
                        >
                            ❌
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
function Footer(props) {
    const { total, packed, percent } = props;
    return (
        <footer className="footer">
            💼 You have {total} items on your list, and you already packed{" "}
            {packed}（{percent}）
        </footer>
    );
}

export default function App() {
    const [list, setList] = useState({});
    const [nums, setNums] = useState(1);
    const [thing, setThing] = useState("");

    const handleSelect = (e) => {
        setNums(+e.target.value);
    };
    const handleInput = (e) => {
        setThing(e.target.value);
    };
    const handleAdd = () => {
        if (thing in list) {
            setList({
                ...list,
                [thing]: { ...list[thing], count: list[thing].count + nums },
            });
        } else {
            console.log({
                ...list,
                [thing]: { done: false, count: nums },
            });
            setList({
                ...list,
                [thing]: { done: false, count: nums },
            });
        }
        console.log("list", list);
    };

    const handleCheck = (e) => {
        const { name, checked } = e.target;
        setList({
            ...list,
            [name]: { ...list[name], done: checked },
        });
    };

    const handleDelete = (name) => {
        console.log("name", name);
    };

    let total = 0;
    let packed = 0;
    for (let item in list) {
        total += list[item].count;
        if (list[item].done) {
            packed += list[item].count;
        }
    }
    let percent = Math.floor((packed / total) * 100) + "%";
    return (
        <>
            <Banner />
            <Appender {...{ handleAdd, handleInput, handleSelect }} />
            <TaskList
                handleCheck={handleCheck}
                handleDelete={handleDelete}
                list={list}
            />
            <Footer {...{ total, packed, percent }} />
        </>
    );
}
