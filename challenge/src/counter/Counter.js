import { useState } from "react";

export default function Counter() {
  const [step, setStep] = useState(1)
  const [count, setCount] = useState(0)

  const date = new Date('2023-09-13')
  date.setDate(date.getDate() + count) //为什么会自动计算？？？

  function reset() {
    setStep(1);
    setCount(0)
  }
  return <div className="count">
    <div>
      <div>
        <input type="range" min="1" max="10" value={step} onChange={(e => setStep(+e.target.value))} />
        <span>{step}</span>
      </div>
      <div></div>
      <div>
        <button className="btn" onClick={() => setCount(p => p - step)}>-</button>
        <input type="text" value={count} onChange={(e) => setCount(+e.target.value)}></input>
        <button className="btn" onClick={() => setCount(p => p + step)}>+</button>
      </div>
      {count} Today is {date.toDateString()}
      <div style={{ textAlign: "center" }}>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  </div>
}