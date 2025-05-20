import {useEffect, useReducer} from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Propgress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";


const SECS_PER_QUESTIONS = 30;

const initialState = {
    questions: [],
    status: 'loading', // 'loading', 'error', 'ready', 'active', 'finished'
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
    secondsRemaining: null,
}


function reducer(state, action) {

    switch(action.type) {

        case 'dataReceived':
            return { ...state, questions: action.payload, status: 'ready' }

        case 'dataFailed':
            return { ...state, status: 'error'}

        case 'start':
            return { ...state, status: 'active', secondsRemaining: state.questions.length * SECS_PER_QUESTIONS}

        case 'nextQuestion':
            return { ...state, index: state.index + 1, answer: null }

        case 'reset':
            return { ...initialState, questions: state.questions, status: "ready" }

        case 'finish':
            const currentHighScore = state.points > state.highScore ? state.points : state.highScore
            return { ...state, status: 'finished', highScore: currentHighScore }

        case 'tick':
            return { ...state, secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? 'finished' : state.status
            }

        case 'newAnswer':
            const question = state.questions.at(state.index)
            const calculatedPoints =  action.payload === question.correctOption
                ? state.points + question.points : state.points
            return {...state, answer: action.payload, points: calculatedPoints}

        default:
            throw new Error('Action unknown')
    }
}

export default function App() {
    const [{questions, status, index, answer, points, highScore, secondsRemaining}, dispatch]
        = useReducer(reducer, initialState)

    const numQuestions = questions.length
    const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points ,0)

    useEffect(() => {
        fetch("http://localhost:8001/questions")
            .then(res => res.json())
            .then(data => dispatch({type: 'dataReceived', payload: data}))
            .catch(err => dispatch({type: 'dataFailed'}))
    }, []);

  return (
      <div className="app">
          <Header/>
          <Main>
              {status === 'loading' && <Loader/>}
              {status === 'error' && <Error/>}
              {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
              {status === 'active' &&
                  <>
                      <Progress
                          numQuestions={numQuestions}
                          index={index}
                          points={points}
                          maxPoints={maxPossiblePoints}
                          answer={answer}
                      />
                      <Question
                          question={questions[index]}
                          dispatch={dispatch}
                          answer={answer}
                      />
                      <Footer>
                      <Timer
                          dispatch={dispatch}
                          secondsRemaining={secondsRemaining}
                      />
                      <NextButton
                          index={index}
                          numQuestions={numQuestions}
                          dispatch={dispatch}
                          answer={answer}
                      />
                    </Footer>
                  </>
              }
              {status === 'finished' &&
                  <FinishScreen
                      points={points}
                      maxPoints={maxPossiblePoints}
                      highScore={highScore}
                      dispatch={dispatch}
                  />
              }
          </Main>
      </div>
  )
}