import Options from "./Options";

function Question({ question, dispatch }) {
  return (
    <div>
      <h3>{question.question}</h3>
      <Options question={question} dispatch={dispatch} />
    </div>
  );
}

export default Question;
