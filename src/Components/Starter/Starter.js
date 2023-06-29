import React from 'react'
import "./Starter.scss"
function Starter({numQuestions, dispatch}) {
  return (
    <div className = "starter-comp">
        <h1 id = "welcome-msg">Welcome to The React Quiz</h1>
        <h2 id = "sub-msg">{numQuestions} questions to test your react mastery.</h2>
        <button onClick = {()=>{dispatch({type:"started"})}} id = "lets-start">Let's start!</button>
    </div>
  )
}

export default Starter
