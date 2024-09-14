function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welecome To The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "active" })}
      >
        start
      </button>
    </div>
  );
}

export default StartScreen;
