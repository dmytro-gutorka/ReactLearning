import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import StarRating from "./StarRating";


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <App />
      {/*<StarRating maxRating={10} defaultRating={3}/>*/}
      {/*<StarRating size={24} color="red"/>*/}
      {/*<Test/>*/}
  </React.StrictMode>
);
