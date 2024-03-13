import { useQuiz } from "../context/QuizProvider";

function StartSecreen() {
  const { dispatch, numQuestion } = useQuiz();
  return (
    <div>
      <h2>Welcom to The React Quiz!</h2>
      <h3>{numQuestion} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start!
      </button>
    </div>
  );
}

export default StartSecreen;
