function Options({ question, dispatch, answer }) {
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => {
        return (
          <button
            className={`btn btn-option ${
              hasAnswer
                ? index === question.correctOption
                  ? "correct answer"
                  : "wrong"
                : ""
            }  ${index === answer ? "answer" : ""}`}
            disabled={hasAnswer}
            onClick={() =>
              dispatch({
                type: "newAnswer",
                payload: index,
              })
            }
            key={option}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
