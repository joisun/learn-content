import { useState } from "react";
import pizzListMock from "./mock/pizzList";
import "./PizzListApp.css";

const Header = () => {
    return (
        <>
            <header className="header">FAST REACT PIZZA CO.</header>
        </>
    );
};
const Pizza = (props) => {
    const { name, ingredients, price, photoName, soldOut } = props;

    return (
        <>
            <img src={photoName} alt="" />
            <h3>{name}</h3>
            <p>{ingredients}</p>
        </>
    );
};
const Footer = () => {
    return (
        <>
            <footer className="footer">
                {new Date().toLocaleTimeString()}. We're currently open
            </footer>
        </>
    );
};

function App() {
    return (
        <div className="container">
            <Header />
            {pizzListMock.items.map((i) => {
                return <Pizza {...i} key={i.name} />;
            })}
            <Footer />
        </div>
    );
}

export default App;
