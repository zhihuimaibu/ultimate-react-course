import { useEffect } from "react";
import { useQuiz } from "../context/QuizProvider";

function Timer() {
  const { dispatch, secondsRemaining } = useQuiz();
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({
        type: "tick",
      });
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [dispatch]);
  return <div className="timer">{secondsRemaining}</div>;
}

export default Timer;
