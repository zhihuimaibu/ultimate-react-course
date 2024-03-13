import { useQuiz } from "../context/QuizProvider";

function Progress() {
  const { index, numQuestion, points, maxPossiableQuestion, answer } =
    useQuiz();
  return (
    <div className="progress">
      <progress max={numQuestion} value={index + (answer !== null)}></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestion}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiableQuestion} points
      </p>
    </div>
  );
}

export default Progress;
