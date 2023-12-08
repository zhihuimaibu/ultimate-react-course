import { useState } from "react";

export default function TextExpander({
  expanded = false,
  buttonColor = "blue",
  collapsedNumWords = "10",
  collapseButtonText = "Show less",
  expandButtonText = "Show more",
  className = "",
  children,
}) {
  const [open, setOpen] = useState(expanded);
  const buttonStyle = {
    color: buttonColor,
    backgroundColor: "transparent",
    border: "none",
    marginLeft: 10,
    cursor: "pointer",
    font: "inherit",
  };

  function handleExpanded() {
    setOpen(!open);
  }

  const str = children.split(" ").slice(0, collapsedNumWords).join(" ");
  return (
    <>
      <div className={className}>
        <span>{open ? children : `${str}...`}</span>
        <button
          style={buttonStyle}
          onClick={handleExpanded}>
          {open ? collapseButtonText : expandButtonText}
        </button>
      </div>
    </>
  );
}
