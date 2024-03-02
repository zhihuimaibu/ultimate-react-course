import React from "react";

function NextButton({ answer, dispatch, index, numQuestion }) {
  if (answer === null) return;
  if (index + 1 < numQuestion) {
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() =>
            dispatch({
              type: "nextQuestion",
            })
          }
        >
          Next
        </button>
      </div>
    );
  }
  return (
    <div>
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: "finish",
          })
        }
      >
        Finish
      </button>
    </div>
  );
}

export default NextButton;
