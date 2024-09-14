function NextButton({ answer, dispatch, index, numQuestions }) {
  if (answer === null) return;

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      {index === numQuestions - 1 ? "Finish" : "Next"}
    </button>
  );
}

export default NextButton;
