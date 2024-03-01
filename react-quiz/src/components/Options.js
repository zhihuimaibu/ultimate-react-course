function Options({ question, dispatch }) {
  return (
    <div className="options">
      {question.options.map((option) => {
        return (
          <button className="btn btn-option" onClick={dispatch}>
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
