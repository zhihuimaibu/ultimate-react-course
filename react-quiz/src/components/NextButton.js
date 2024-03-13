import React from "react";
import { useQuiz } from "../context/QuizProvider";

function NextButton() {
  const { answer, dispatch, index, numQuestion } = useQuiz();
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
