import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import { useEffect, useReducer, useRef } from 'react';
import Loader from './Components/Loader/Loader';
import Starter from './Components/Starter/Starter';
import QuestionWindow from "./Components/QuestionWindow/QuestionWindow"
import Progress from './Components/Progress/Progress';
import Ender from './Components/Ender/Ender';
function App() {
  const arrayRef = useRef()
  const totalRef = useRef()
  const reducer = (state, action)=>{
    switch(action.type){
      case "data-received":
        // console.log(action.payload, " payload")
        return {...state, status:"loaded", array:action.payload}
      case "started":
        return {...state, status: "active"}
      case "restarted":
        const arr = [];
        for(let i = 0; i < state.array?.length; i++){
          arr[i] = {answered:0, myanswer:-1}
        }
        arrayRef.current = arr
        return {...state, status: "loaded", index:0,points:0}
      case "next":
        if(state.index == state.array.length -1){
          return {...state, status: "ended"}
        }
        return {...state, index:state.index + 1, points : state.points + action.payload}
      case "previous":
          return {...state, index:state.index - 1}
      case "timeout":
        return {...state, status: "ended"}
        return
      case "add-points":
          return 
      default:

    }
  }
  const[state, dispatch] = useReducer(reducer, {array:[], status:"loading",index: 0,points: 0})
  // console.log(state, " state")
  const {array,status,index,points} = state

  useEffect(()=>{
   loadArray()
  },[])


  const loadArray = async ()=> {
    const res = await fetch("http://localhost:9000/questions")
    const jsonRes = await res.json()
    const arr = [];
    for(let i = 0; i < jsonRes.length; i++){
      arr.push({answered:0, myanswer:-1})
    }
    arrayRef.current = arr
    addTotalPoints(jsonRes)
    dispatch({type:"data-received", payload:jsonRes})
  }


  const addTotalPoints = (arr)=> {
    const totalOfArray = arr?.reduce((total,item)=>{
      return total + item.points
    },0)
    totalRef.current = totalOfArray
  }
  // console.log("currentindex", index)
  return (
    <div className="App">
      <Header />
      {status == "active" && <Progress numQuestions = {array.length} index = {index + 1} points = {points} total = {totalRef.current}/>}
      {status === "loading" && <Loader />}
      {status === "loaded" && <Starter numQuestions = {array?.length} dispatch = {action=>dispatch(action)}/>}
      {status === "active" && <QuestionWindow arrayref = {arrayRef} obj = {array[index]} dispatch = {(type)=>dispatch(type)} correct = {array[index].correctOption} index = {index}/>}
      {status === "ended" && <Ender dispatch = {action=>dispatch(action)} score = {points} totalScore={totalRef.current} />}
    </div>
  );
}

export default App;