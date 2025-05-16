// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useState, useEffect } from "react";

const URL = "https://api.frankfurter.app";

export default function App() {
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");

  const [value, setValue] = useState(0);
  const [output, setOutput] = useState(null);

  console.log(value);
  console.log(output);

  useEffect(
      function () {
        async function convertCurrency() {
          const res = await fetch(
              `${URL}/latest?amount=${value}&from=${currencyFrom}&to=${currencyTo}`
          );
          const data = await res.json();
          const convertedValue = Object.values(data.rates)[0].toFixed(2);

          setOutput(convertedValue);
        }

        if (currencyFrom === currencyTo) return setOutput(value);
        if (value) convertCurrency();
        if (value < 10) return () => setOutput(0);
      },
      [currencyFrom, currencyTo, value]
  );

  return (
      <div>
        <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
        <select
            value={currencyFrom}
            onChange={(e) => setCurrencyFrom(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select
            value={currencyTo}
            onChange={(e) => setCurrencyTo(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <p>OUTPUT: {output && output}</p>
      </div>
  );
}
