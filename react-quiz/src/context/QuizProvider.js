import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  answer: null,
  index: 0,
  points: 0,
  highscore: 0,
  secondsRemaining: 40,
};

function reduce(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataError":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active", answer: null, index: 0, points: 0 };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? (state.points += question.points)
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.highscore > state.questions[state.index].points
            ? state.highscore
            : state.questions[state.index].points,
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining > 0 ? state.status : "finished",
      };
    default:
      console.log("---");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, answer, index, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reduce, initialState);
  const numQuestion = questions.length;
  const maxPossiableQuestion = questions.reduce(
    (pre, cur) => pre + cur.points,
    0
  );

  useEffect(() => {
    fetch(" http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "dataReceived",
          payload: data,
        })
      )
      .catch((err) =>
        dispatch({
          type: "dataError",
        })
      );
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        answer,
        index,
        points,
        highscore,
        secondsRemaining,
        numQuestion,
        maxPossiableQuestion,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) throw new Error("sdfsf");
  return context;
}
export { QuizProvider, useQuiz };
