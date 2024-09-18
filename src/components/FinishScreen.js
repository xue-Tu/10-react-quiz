function FinishScreen({ points, numPoints, highscore, dispatch }) {
  const percentage = (points / numPoints) * 100;

  return (
    <>
      <p className="result">
        You scored <strong>{points} </strong>out of {numPoints}(
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(highscore: {highscore})</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restar" })}
      >
        Restar
      </button>
    </>
  );
}

export default FinishScreen;
