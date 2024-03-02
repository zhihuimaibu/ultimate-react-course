function Progress({
  index,
  numQuestions,
  points,
  maxPossiableQuestion,
  answer,
}) {
  return (
    <div className="progress">
      <progress max={numQuestions} value={index + (answer !== null)}></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiableQuestion} points
      </p>
    </div>
  );
}

export default Progress;
