import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function Step() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  function handlePrevious() {
    if (step > 1) setStep(step - 1)
  }
  function handleNext() {
    if (step < 3) {
      setStep(step + 1)
      setStep(p => p + 1)
    }
  }
  return <div>
    <>
      <div className="close" onClick={() => setIsOpen(!isOpen)}>&times;</div>
      {
        isOpen &&
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? 'active' : ''}>1</div>
            <div className={step >= 2 ? 'active' : ''}>2</div>
            <div className={step >= 3 ? 'active' : ''}>3</div>
          </div>
          <div className="message">
            Step {step}: {messages[step - 1]}
          </div>
          <div className="buttons">
            <button style={{ backgroundColor: '#7950f2', color: '#FFFFFF' }} onClick={handlePrevious}>previous</button>
            <button style={{ backgroundColor: '#7950f2', color: '#FFFFFF' }} onClick={handleNext}>next</button>
          </div>
        </div>
      }
    </>
  </div>
}

function App() {
  return <>
    <Step />
    <Step />
    <Step />
  </>

}

export default App;