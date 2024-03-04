import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import FlashCards from "./flashCard/FlashCard";
import Counter from "./counter/Counter";
import Resume from "./resume/resume";
import Accordion from "./accordion/Accordion";
import Bill from "./bill/Bill";
import TextExpander from "./textExpander";
import CurrencyConverter from "./currencyConverter";
import UseLocation from "./location";
import BankAccount from "./bankAccount";

function App() {
  return (
    <>
      <div>
        <BankAccount />
        {/* <Bill /> */}
        {/* <FlashCards /> */}
        {/* <Counter /> */}
        {/* <Accordion /> */}
        {/* <Resume /> */}
        {/* <div>
          <TextExpander>
            Space travel is the ultimate adventure! Imagine soaring past the
            stars and exploring new worlds. It's the stuff of dreams and science
            fiction, but believe it or not, space travel is a real thing. Humans
            and robots are constantly venturing out into the cosmos to uncover
            its secrets and push the boundaries of what's possible.
          </TextExpander>

          <TextExpander
            collapsedNumWords={20}
            expandButtonText="Show text"
            collapseButtonText="Collapse text"
            buttonColor="#ff6622"
          >
            Space travel requires some seriously amazing technology and
            collaboration between countries, private companies, and
            international space organizations. And while it's not always easy
            (or cheap), the results are out of this world. Think about the first
            time humans stepped foot on the moon or when rovers were sent to
            roam around on Mars.
          </TextExpander>

          <TextExpander expanded={true} className="box">
            Space missions have given us incredible insights into our universe
            and have inspired future generations to keep reaching for the stars.
            Space travel is a pretty cool thing to think about. Who knows what
            we'll discover next!
          </TextExpander>
        </div> */}
        {/* <CurrencyConverter /> */}
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
