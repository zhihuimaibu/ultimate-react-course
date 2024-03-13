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
import { useQuiz } from "./context/QuizProvider.js";

export default function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartSecreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <footer>
              <Timer />
              <NextButton />
            </footer>
          </>
        )}
        {status === "finished" && <FinishSreen />}
      </Main>
    </div>
  );
}
