/* eslint-disable react/prop-types */
import "./ProfileCard.css";
function Avatar() {
    return <div className="img"></div>;
}
function Intro() {
    return (
        <>
            <h2 className="name">Jonas Schedtmann</h2>
            <p className="intro">
                Full-stacl web developer Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Nam similique facere, veritatis ad non eveniet
                minus, exercitationem architecto assumenda quam neque
                dignissimos voluptatum provident deleniti animi distinctio eos,
                odit voluptate.
            </p>
        </>
    );
}
function Skill(props) {
    return (
        <li className="skill" style={{ backgroundColor: props.color }}>
            {props.name}
        </li>
    );
}
function SkillList({ data }) {
    return (
        <ul className="skill-list">
            {data.map((i) => {
                return <Skill color={i.color} name={i.name} key={i.name} />;
            })}
        </ul>
    );
}

export default function App() {
    const skillListData = [
        { name: "HTML+CSS👍", color: "blue" },
        { name: "Javascript👍", color: "yellow" },
        { name: "Web Design👍", color: "lightgreen" },
        { name: "Git and Github👍", color: "orange" },
        { name: "React👍", color: "skyblue" },
        { name: "Sevelte👍", color: "red" },
    ];
    return (
        <div className="card">
            <Avatar />
            <div className="data">
                <Intro />
                <SkillList data={skillListData} />
            </div>
        </div>
    );
}
