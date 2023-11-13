import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import FlashCards from "./flashCard/FlashCard";
import Counter from "./counter/Counter";
import Resume from "./resume/resume";
import Accordion from "./accordion/Accordion";
import Bill from "./bill/Bill";

function App() {
  return (
    <>
      <div>
        <Bill />
        {/* <FlashCards /> */}
        {/* <Counter /> */}
        {/* <Accordion /> */}
        {/* <Resume /> */}
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
