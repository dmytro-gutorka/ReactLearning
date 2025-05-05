import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";


const pizzaData = [
    {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        price: 6,
        photoName: "pizzas/focaccia.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        price: 10,
        photoName: "pizzas/margherita.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        price: 12,
        photoName: "pizzas/spinaci.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        price: 12,
        photoName: "pizzas/funghi.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        price: 15,
        photoName: "pizzas/salamino.jpg",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
        price: 18,
        photoName: "pizzas/prosciutto.jpg",
        soldOut: false,
    },
];


function App() {
    return (
        <div className="container">
            <Header />
            <Menu />
            <Footer />
        </div>
    );
}


function Header() {
    const inlineStyles = {};

    return (
        <header className="header">
            <h1 style={{ inlineStyles }}>Fast React pizza Co.</h1>
        </header>
    );
}


function Menu() {
    const pizzas = pizzaData;
    const hasPizzas = pizzas.length;

    return (

        <main className="menu">
            <h2>Our menu</h2>
            {hasPizzas > 0 ? (
            <>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aut consequuntur deleniti dolore doloremque, doloribus enim exercitationem expedita fuga laudantium mollitia nesciunt non nostrum numquam provident recusandae temporibus, unde veritatis.</p>
                <ul className="pizzas">
                    {pizzas.map(pizza => <Pizza pizzaObj={pizza} key={pizza.name}/>)}
                </ul>
            </>
            ) : <p>we're are still working on our menu. Please come back latter</p>}
        </main>
    );
}


function Pizza(props) {
    const { photoName, name, ingredients, price, soldOut } = props.pizzaObj

    // if (soldOut) return null;

    return (
        <li className={`pizza ${soldOut ? 'sold-out' : ''}`}>
            <img src={photoName} alt={name} />
            <div>
                <h3>{name}</h3>
                <p>{ingredients}</p>
                <span>{soldOut ? 'SOLD OUT' : price}</span>
            </div>
        </li>
    );
}


function Footer() {
    const hour = new Date().getHours();
    const openHour = 12;
    const closeHour = 22;
    const isOpen = hour >= openHour && hour <= closeHour;

    if (!isOpen) return (
        <p>We're happy to welcome you between {openHour} and {closeHour}</p>
    )

    return (
        <footer className="footer">
            {isOpen ? (<Order closeHour={closeHour} openHour={openHour} />) :
                (
                    <p>We're happy to welcome you between {openHour} and {closeHour}</p>
                )}
        </footer>
    );
}


function Order({closeHour, openHour}) {

    return (
        <div className="order">
            <p>We're open from {openHour}:00 till {closeHour}:00</p>
            <button className="btn">Order</button>
        </div>
    );
}


const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
