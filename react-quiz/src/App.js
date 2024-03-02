import { useEffect, useReducer } from "react";
import Header from "./components/Header.js";
import Main from "./components/Main.js";
import StartSecreen from "./components/StartSecreen.js";
import Loader from "./components/Loader.js";
import Error from "./components/Error.js";
import Question from "./components/Question.js";
import NextButton from "./components/NextButton.js";
import Progress from "./components/Progress.js";
import FinishSreen from "./components/FinishSecreen.js";
import Timer from "./components/Timer.js";

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  answer: null,
  index: 0,
  points: 0,
  highscore: 0,
  secondsRemaining: 10,
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

export default function App() {
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
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartSecreen dispatch={dispatch} numQuestion={numQuestion} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestion}
              points={points}
              maxPossiableQuestion={maxPossiableQuestion}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                answer={answer}
                dispatch={dispatch}
                index={index}
                numQuestion={numQuestion}
              />
            </footer>
          </>
        )}
        {status === "finished" && (
          <FinishSreen
            points={points}
            maxPossiableQuestion={maxPossiableQuestion}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
