function Options({ question, answer, dispatch }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          className={`btn btn-option ${answer === index && "answer"} ${
            answer !== null &&
            (index === question.correctOption ? "correct" : "wrong")
          }`}
          key={option}
          disabled={answer !== null}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
