export default function FinishScreen({ points, maxPoints, highScore, dispatch }) {

    const percentage = (points / maxPoints) * 100

    return (
        <>
            <p className="result">
                You scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)
            </p>
            <p className="highscore">
                (High score: {highScore} points)
            </p>
            <button className="btn btn-ui" onClick={() => dispatch({type: 'reset'})}>Reset Quiz</button>
        </>
    )
}