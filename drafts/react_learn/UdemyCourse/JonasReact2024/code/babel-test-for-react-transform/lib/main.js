function Card() {
  return /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("p", null, "Hello"), /*#__PURE__*/React.createElement("p", null, "React!"));
}
export default function App() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", null, "This is header"), /*#__PURE__*/React.createElement(Card, null), /*#__PURE__*/React.createElement(Card, null), /*#__PURE__*/React.createElement(Card, null), /*#__PURE__*/React.createElement("footer", null, "This is footer"));
}
console.log( /*#__PURE__*/React.createElement(App, null));