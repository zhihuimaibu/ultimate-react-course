import { useState } from "react";
import Button from "./Button";

export default function MovieBox({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className='box'>
      <Button onClick={() => setIsOpen1((open) => !open)}>
        {isOpen1 ? "–" : "+"}
      </Button>
      {isOpen1 && children}
    </div>
  );
}
