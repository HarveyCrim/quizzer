import React, { useEffect, useState } from 'react'
import "./Timer.scss"
function Timer({timelimit, dispatch}) {
    // console.log(timelimit, "timelimit")
  const [time, setTime] = useState(timelimit)
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  useEffect(()=>{
    const id = setInterval(decreaseTime,1000)
    return ()=> {clearInterval(id)}
  },[time])
  const decreaseTime = ()=> {
    if(time == 0){
        return dispatch({type:"timeout"})
    }
    setTime(time - 1)
  }
  return (
    <button className = "time-comp">{(minutes / 10 < 1 ? "0"+minutes : minutes)+":"+ (seconds / 10 < 1 ? "0"+seconds : seconds)}</button>
  )
}

export default Timer
