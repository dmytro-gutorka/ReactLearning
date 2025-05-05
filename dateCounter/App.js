import { useState } from "react";
import "./styles.css";

export default function App() {
    const [step, setStep] = useState(1);
    const [count, setCount] = useState(0);

    function handlerStepMore() {
        setStep((s) => s + 1);
    }

    function handlerStepLess() {
        if (step > 1) setStep((s) => s - 1);
    }

    function handlerCountMore() {
        setCount((c) => c + 1 * step);
    }

    function handlerCountLess() {
        setCount((c) => c - 1 * step);
    }

    function getDateByCount(count, direction = null) {
        const currentDate = new Date();
        if (direction === "from")
            currentDate.setDate(currentDate.getDate() + count);
        if (direction === "ago") currentDate.setDate(currentDate.getDate() + count);

        return currentDate.toLocaleDateString();
    }

    return (
        <div className="App">
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={handlerStepLess}>-</button>
                <p>Steps: {step}</p>
                <button onClick={handlerStepMore}>+</button>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={handlerCountLess}>-</button>
                <p>Count: {count}</p>
                <button onClick={handlerCountMore}>+</button>
            </div>
            <p>
                {count === 0 && `Today is ${getDateByCount(count)}`}
                {count > 0 &&
                    `${count} days from today is ${getDateByCount(count, "from")}`}
                {count < 0 && ` ${count} days ago was ${getDateByCount(count, "ago")}`}
            </p>
        </div>
    );
}
