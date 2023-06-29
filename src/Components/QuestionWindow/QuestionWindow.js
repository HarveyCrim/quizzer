import React, { useEffect, useReducer, useState } from 'react'
import Option from '../Option/Option'
import "./QuestionWindow.scss"
import Timer from '../Timer/Timer'
function QuestionWindow({obj, timer,correct,arrayref,dispatch,index}) {
  useEffect(()=>{
    qwDispatch({type:"just-loaded"})
  },[index])
  const initialState = {answered: false,correctlyAnswered: false, youranswer:-1}
  const qwReducer = (state, action)=> {
    switch(action.type){
        case "answered":
            arrayref.current[index] = {answered:1, myanswer: action.payload}
            // console.log(arrayref.current)
            if(action.payload == correct){
                return {correctlyAnswered: true, answered: true, youranswer:action.payload}
            }
            else{
                return {correctlyAnswered: false, answered: true, youranswer:action.payload}
            }
        case "just-loaded":
            if(arrayref.current[index].answered == 1){
                return {...state, answered:true,youranswer:arrayref.current[index].myanswer}
            }
            else{
                return initialState
            }
        case "next":
            if(state.correctlyAnswered){
                dispatch({type:"next",payload:obj.points})
            }
            else{
                dispatch({type:"next",payload:0})
            }
            return state
    }
  }
  const[state, qwDispatch] = useReducer(qwReducer, initialState)
  const {answered, correctlyAnswered, youranswer} = state

  const nextClicked = ()=> {
    if(answered){
        if(correctlyAnswered){
            dispatch({type:"next", payload:obj.points})
        }
        else{
            dispatch({type:"next", payload:0})
        }
    }
  }

  const prevClicked = ()=> {
    if(index != 0){
        dispatch({type:"previous"})
    }
  }

  return (
    <div className = "question-comp">
        <div className = "question-sub-comp">
            <h1 id = "question-title">{obj.question}</h1>
                <div className = "answers-sec">
                    {
                        obj.options.map((item, itemindex)=>{
                            return <Option answeredFunc = {(action)=>{ qwDispatch(action);}}answered = {answered} mychoice = {youranswer + 1} correct = {correct + 1} index = {itemindex + 1} text = {item}/>
                        })
                    }
                </div>
        </div>
        <div className = "prev-next">
            <button onClick = {prevClicked} className = {index == 0 ? "two-buttons greyed-out" :"two-buttons button-hover"}>
                Previous
            </button>
           <Timer timelimit = {300} dispatch = {dispatch}/>
            <button onClick = {nextClicked} className = {answered ? "two-buttons button-hover" : "two-buttons greyed-out"}>
                Next
            </button>
        </div>
    </div>
  )
}

export default QuestionWindow
