import { useQuiz } from "../context/QuizProvider";

function StartSecreen() {
  const { dispatch, points, maxPossiableQuestion, highscore } = useQuiz();
  const percentage = (points / maxPossiableQuestion) * 100;
  return (
    <div>
      <p className="result">
        you're scored <strong>{points}</strong> out of {maxPossiableQuestion} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz!
      </button>
    </div>
  );
}

export default StartSecreen;
