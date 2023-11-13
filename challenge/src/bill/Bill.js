import { useState } from "react";
import "./Bill.css";
export default function Bill() {
  const [price, setPrice] = useState("");
  const [percentage1, setPercentage1] = useState("");
  const [percentage2, setPercentage2] = useState("");
  const tip = price * ((percentage1 + percentage2) / 2 / 100);

  function handlePrice(e) {
    setPrice(Number(e.target.value));
  }

  function handleReset() {
    setPrice("");
    setPercentage1("");
    setPercentage2("");
  }

  return (
    <div>
      <Pay
        price={price}
        onPrice={handlePrice}
      />
      <Satis
        percentage={percentage1}
        onSelectPercentage={setPercentage1}>
        How did you like the service?
      </Satis>
      <Satis
        percentage={percentage2}
        onSelectPercentage={setPercentage2}>
        How did your friend like the service?
      </Satis>
      {price > 0 && (
        <>
          <Output
            price={price}
            tip={tip}
          />
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}

// 放在Bill组件内部 每次输入input值会导致重新渲染
function Pay({ price, onPrice }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type='text'
        value={price}
        onChange={(e) => onPrice(e)}></input>
    </div>
  );
}

function Satis({ children, percentage, onSelectPercentage }) {
  return (
    <div>
      <label>{children}</label>
      <select
        id='satis'
        value={percentage}
        onChange={(e) => onSelectPercentage(Number(e.target.value))}>
        <option value={0}>0%</option>
        <option value={5}>5%</option>
        <option value={10}>10%</option>
        <option value={20}>20%</option>
      </select>
    </div>
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>reset</button>;
}

function Output({ price, tip }) {
  return (
    <p>
      You pay ${price + tip}(${price} + ${tip} tip)
    </p>
  );
}
