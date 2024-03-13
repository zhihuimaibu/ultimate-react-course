import { useQuiz } from "../context/QuizProvider";
import Options from "./Options";

function Question() {
  const { questions, dispatch, answer, index } = useQuiz();
  const question = questions.at(index);
  return (
    <div>
      <h3>{question.question}</h3>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
