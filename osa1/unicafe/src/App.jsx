import { useState } from 'react'

const Statistics = (props) => {
  console.log(props)
  const all = props.good + props.neutral + props.bad || null
  const average = (props.good-props.bad) / all || 0
  const positive = 100 * props.good / all || 0
  const noFeedback = "No feedback given"

  if (all === null) {
    return (
      <p>{noFeedback}</p>
    )
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} char="%" />
        </tbody>
      </table>
    )
  }
}  

//return (
//  <div>
//    <div>good {props.good}</div>
//    <div>neutral {props.neutral}</div>
//    <div>bad {props.bad}</div>
//    <div>all {all}</div>
//    <div>average {average}</div>
//    <div>positive {positive} %</div>
//  </div>
//)

const StatisticLine = ( {text, value, char} ) => (
  <tr>
    <td>{text}</td> 
    <td>{value} {char}</td>
  </tr>
)

const Button = ({ onClick, text }) => (
  <button onClick = {onClick}>{text} </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good"/>
      <Button onClick={handleNeutral} text="neutral"/>
      <Button onClick={handleBad} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App