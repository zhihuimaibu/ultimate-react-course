import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import StarRating from "./StarRating";

function Test() {
  const [fullStarNum, setFullStarNum] = useState(0);
  return (
    <div>
      <StarRating
        color='blue'
        setFullStarNum={setFullStarNum}
      />
      <p>rated {fullStarNum} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      length={10}
      defaultIndex={3}
    />
    <StarRating
      color='red'
      message={["Terrible", "Bad", "Okey", "Good", "Amazing"]}
    />
    <Test />
  </React.StrictMode>
);
