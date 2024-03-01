import { useEffect, useReducer } from "react";
import Header from "./components/Header.js";
import Main from "./components/Main.js";
import StartSecreen from "./components/StartSecreen.js";
import Loader from "./components/Loader.js";
import Error from "./components/Error.js";
import Question from "./components/Question.js";

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  answer: null,
};

function reduce(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataError":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      return { ...state, answer: action.answer };
    default:
      console.log("---");
  }
}

export default function App() {
  const [{ questions, status }, dispatch] = useReducer(reduce, initialState);
  const numQuestion = questions.length;

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
          <Question question={questions.at(0)} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}
