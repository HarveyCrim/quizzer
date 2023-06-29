import React from 'react'
import "./Progress.scss"
function Progress({numQuestions,index,points,total}) {
  return (
    <div className = "progress-comp">
      <div className = "prog-tracker">
        <div style = {{width:`${(100/numQuestions) * index}%`}} className = "progress-made">
        </div>
      </div>
    <div className = "progress-stats">
      <span className = "stats">{"Question "+index+" / "+ numQuestions}</span>
      <span className = "stats">{"Points "+points+" / "+ total}</span>
    </div>
    </div>
  )
}

export default Progress
