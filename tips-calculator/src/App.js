import { useState } from "react";


const rates = [
  {
    text: "dissatisfied: (0%)" ,
    tips: 0,
  },
  {
    text: "good: (10%)",
    tips: 10,
  },
  {
    text: "great: (20%)",
    tips: 20,
  },
];


export default function App() {
  const [bill, setBill] = useState(0);
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const totalTips = percentage1 + percentage2;
  const totalBill =  bill + bill * (totalTips / 100);
  const tips = Math.trunc(bill * (totalTips / 100))

  return (
      <div>
        <InputBill bill={bill} onBill={setBill}/>
          <Select percentage={percentage1} onPercentage={setPercentage1}>
              Your rate
          </Select>
          <Select percentage={percentage2} onPercentage={setPercentage2}>
              Your friend's rate
          </Select>
          {bill > 0 && (<BillOutput totalBill={totalBill} tips={tips} bill={bill}/>)}
        <Button onBill={setBill} onPercentage1={setPercentage1} onPercentage2={setPercentage2}>
          children
          </Button>
      </div>
  );
}


function InputBill({ bill, onBill }) {
  return (
        <div>
            How much was the bill ?
            <input type="text" value={bill} onChange={(e) => onBill(Number(e.target.value))}/>
        </div>
  );
}


function Select({ onPercentage, percentage, children }) {
  return (
      <div>
          {children}
        <select
            value={percentage}
            onChange={(e) => onPercentage(+e.target.value)}>
            {rates.map((rate, index) => <option key={index} value={rate.tips}>{rate.text}</option>)}
        </select>
      </div>
  );
}


function BillOutput({ totalBill, tips, bill}) {
    return (
        <p>You pay ${totalBill} (${bill} + ${tips}) tip</p>
    )
}

function Button({ onBill, onPercentage1, onPercentage2, children}) {
    function handleReset() {
        onBill(0)
        onPercentage1(0)
        onPercentage2(0)
    }

    return (
        <button onClick={handleReset}>{children}</button>
    )
}
