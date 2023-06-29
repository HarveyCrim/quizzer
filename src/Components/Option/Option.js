import React from 'react'
import "./Option.scss"
function Option({index, text, correct, mychoice, answered, answeredFunc}) {
  return (
    <div onClick = {()=>{answeredFunc({type:"answered", payload: index - 1})}} className = {answered && (correct == index) ? "option-comp correct" : (answered && (index == mychoice) ? "option-comp youranswer" : (answered ? "option-comp clicked" : "option-comp unclicked"))}>
        <span id = "q-num">{index}</span><span id = "option-text">{text}</span>
    </div>
  )
}

export default Option
