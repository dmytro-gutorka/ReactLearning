export default function StartScreen({ numQuestions }) {

    return (
        <div className="start">
            <h2>Welcome to The React Quiz1</h2>
            <h3>{numQuestions} questions to test your React mastery</h3>

            <button>Let's start</button>
        </div>
    )
}