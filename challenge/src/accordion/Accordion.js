import { useState } from "react";
import "./Accordion.css";

export default function Accordion() {
  const [openNum, setOpenNum] = useState();
  const faqs = [
    {
      title: "Where are these chairs assembled?",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
    },
    {
      title: "How long do I have to return my chair?",
      text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
    },
    {
      title: "Do you ship to countries outside the EU?",
      text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
    },
  ];
  function handleClick(num) {
    setOpenNum((n) => (n === num ? "" : num));
  }

  return (
    <div className='accordion'>
      {faqs.map((f, i) => {
        return (
          <AccordionItem
            key={f.title}
            num={i}
            title={f.title}
            openNum={openNum}
            onClick={handleClick}>
            {f.text}
          </AccordionItem>
        );
      })}
    </div>
  );
}

// state三部曲：1.定义 2.使用 3.更新 （）的意义？有自己的state,不受其他state控制
function AccordionItem({ num, title, openNum, onClick, children }) {
  // const [open, setOpen] = useState(false);
  function handleToggle(num) {
    // setOpen((o) => !o);
    onClick(num);
  }

  return (
    <div
      className={openNum === num ? "item open" : "item"}
      onClick={() => handleToggle(num)}>
      <div className='number'>{num < 9 ? `0${num + 1}` : num + 1}</div>
      <div className='title text'>{title}</div>
      <div className='icon'>{openNum === num ? "-" : "+"}</div>
      {openNum === num && <div className='content-box'>{children}</div>}
    </div>
  );
}
