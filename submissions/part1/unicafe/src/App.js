import {useState} from 'react'

const StatisticLine = ({text, value}) => <td>{text} {value}</td>
const Button = ({text, updater}) => <button onClick={updater}>{text}</button>

const Statistics = ({good, neutral, bad}) => {
  const getAverage = () => (good - bad) / (good + neutral + bad)
  const getPositive = () => (good) / (good + neutral + bad) * 100
  if (getPositive()) {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
          <tr>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="average" value={getAverage()}/>
            <StatisticLine text="positive" value={getPositive()}/>
          </tr>
          </tbody>
        </table>
      </>)
  } else {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)


  return (
    <div>
      <h1>give feedback</h1>
      <div id="feedback_btns">
        <Button text="good" updater={handleGood}/>
        <Button text="neutral" updater={handleNeutral}/>
        <Button text="bad" updater={handleBad}/>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App