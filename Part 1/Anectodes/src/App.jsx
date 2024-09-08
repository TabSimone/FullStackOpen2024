import { Component, useState } from 'react'

const MostVoted = (props) => {
  let counter = 0;
  let position = 0;
  for (let i = 0; i < props.array.length; i++) {
    if(counter < props.array[i]){
      counter = props.array[i]
      position = i
    }
  }

  return (
    <div>
    <p> {props.anecdotes[position]} </p>  
    <p> {counter} </p> 
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const [points, setVote] = useState(new Uint8Array(anecdotes.length))

  const changeAnedocte = () => {
    let randomNumber = Math.floor(Math.random() * anecdotes.length);
    return setSelected(randomNumber)
  }

  const changeVote = () => {
    const copy = points.slice()
    copy[selected] += 1
    return setVote(copy)
  }


  return (
    <div>
      {anecdotes[selected]}
      <br></br>
      <button onClick={changeAnedocte}>next anecdote</button>
      <button onClick={changeVote}>vote</button>
      {points[selected]}
      <h1>log all array of votes</h1>
      <p>{Array.from(points).join(', ')}</p> {/* Display all points */}
      <MostVoted array = {points} anecdotes = {anecdotes}/>


    </div>
    

  )
}

export default App;