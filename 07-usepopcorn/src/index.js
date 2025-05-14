import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import StarRating from "./StarRating";


const root = ReactDOM.createRoot(document.getElementById('root'));

function Test() {
    const [movieRating, setMovieRating] = useState(0)

    return (
        <div>
            <StarRating color='blue' maxRating={10} onMovieRating={setMovieRating}/>
            {movieRating ? <p>The movie was rated with {movieRating} stars</p> :
                <p>The movie was not rated yet</p> }

        </div>
    )
}

root.render(
  <React.StrictMode>
    {/*<App />*/}
      <StarRating maxRating={10} defaultRating={3}/>
      <StarRating size={24} color="red"/>
      <Test/>
  </React.StrictMode>
);
