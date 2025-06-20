import { useState } from 'react'

const Button = ({onClick, text}) => (
  <button onClick = {onClick}>{text} </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const anecdotes_len = anecdotes.length - 1
  const [votes, setVote] = useState(Array(anecdotes_len).fill(0))
  const votes_copy = [...votes]
  const most = votes.indexOf(Math.max(...votes))
  const anecdote_most = anecdotes[most]

  const handleSelectNext = () => {
    const newNumber = Math.floor(Math.random()*anecdotes_len)
    if (newNumber === selected) {
      console.log("sama")
      return handleSelectNext()
    }
    console.log(newNumber)
    setSelected(newNumber)
    return newNumber
  }

  const handleVote = () => {
    votes_copy[selected] += 1
    setVote(votes_copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes_copy[selected]} votes</div>
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleSelectNext} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <div>{anecdote_most}</div>
      <div>has {votes_copy[most]} votes</div>
    </div>
  )
}

export default App
