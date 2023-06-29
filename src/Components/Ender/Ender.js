import React from 'react'
import "./Ender.scss"
function Ender({score, totalScore, dispatch}) {
  return (
    <div className = "ender-comp">
      <h1 id = "welcome-msg"> You finished the quiz !</h1>
      <h2 id = "sub-msg"> Your final score is {score} / {totalScore}</h2>
      <button onClick = {e=> dispatch({type:"restarted"})} id = "start-again">Retake the quiz!</button>
    </div>
  )
}

export default Ender
