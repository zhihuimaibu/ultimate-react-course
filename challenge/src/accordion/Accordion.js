import "./Accordion.css";

export default function Accordion() {
  const faqs = [
    {
      id: '01',
      title: "Where are these chairs assembled?",
      text:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
    },
    {
      id: '02',
      title: "How long do I have to return my chair?",
      text:
        "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
    },
    {
      id: '03',
      title: "Do you ship to countries outside the EU?",
      text:
        "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
    }
  ];

  return (
    <div className="accordion">
      {
        faqs.map(v => {
          return <div className="item open " key={v.id}>
            <div className="content-box">
              <div className="number">{v.id}</div>
              <div className="title text">{v.title}</div>
              {v.text}
            </div>
          </div>
        })
      }
    </div>
  );
}
