import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

function reducer(state, action) {
  switch (action.type) {
    case "fetch":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "error":
      return { ...state, status: "error" };
    case "active":
      return { ...state, status: "active" };
    case "reset":
      return { ...state, status: "loading" };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      if (state.index + 1 === state.questions.length)
        return {
          ...state,
          status: "finish",
          highscore:
            state.highscore > state.points ? state.highscore : state.points,
        };

      return { ...state, index: state.index + 1, answer: null };
    default:
      throw new Error("Unknow action");
  }
}

const initialState = {
  questions: [],
  // "loading"、"error"、"ready"、"active"、"finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

export default function App() {
  const [{ status, questions, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const numPoints = questions.reduce((pre, cur) => pre + cur.points, 0);
  const isFinished = index === numQuestions;

  useEffect(function () {
    async function fetchData() {
      try {
        dispatch({ type: "reset" });
        const res = await fetch("http://localhost:8000/questions");
        if (!res.ok) throw new Error("获取数据失败");

        const data = await res.json();

        dispatch({ type: "fetch", payload: data });
      } catch (err) {
        console.log(err.__proto__);
        dispatch({ type: "error" });
      }
    }

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={questions.length}
              numPoints={numPoints}
              points={points}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              answer={answer}
              dispatch={dispatch}
              isFinished={isFinished}
              numQuestions={numQuestions}
              index={index}
            />
          </>
        )}
        {status === "error" && <Error />}
        {status === "finish" && (
          <FinishScreen
            points={points}
            numPoints={numPoints}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}
