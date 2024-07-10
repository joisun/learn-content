const Person = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.occupation}</p>
    </div>
  );

  // return React.createElement("div", {}, [
  //   React.createElement("h1", { key: 1 }, props.name),
  //   React.createElement("p", { key: 2 }, props.occupation),
  // ]);
};
const App = () => {
  return (
    <div>
      <Person name='Yihua' occupation='instructor' />
      <Person name='Andre' occupation='leader instructor' />
      <Person name='Emily' occupation='teacher' />
    </div>
  );
  /**
   * { param1 }the component you want render
   * { param2 }object with attributes
   * { param3 }children nest inside it, could be an array
   */

  // return React.createElement("div", {}, [
  //   React.createElement(
  //     "h1",
  //     { className: "title", key: 0 },
  //     "React is rendered",
  //   ),
  //   React.createElement(
  //     Person,
  //     { name: "Yihua", occupation: "instructor", key: 1 },
  //     null,
  //   ),
  //   React.createElement(
  //     Person,
  //     { name: "Andre", occupation: "leader instructor", key: 2 },
  //     null,
  //   ),
  //   React.createElement(
  //     Person,
  //     { name: "Emily", occupation: "teacher", key: 3 },
  //     null,
  //   ),
  // ]);
};
const { createRoot } = ReactDOM;
const root = createRoot(document.getElementById("root"));
root.render(React.createElement(App));
