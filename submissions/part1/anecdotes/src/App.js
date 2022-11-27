import {useState} from 'react'

const ButtonUpdate = ({updateSelected}) => <button onClick={updateSelected}>next anecdote</button>
const ButtonVote = ({updateVote}) => <button onClick={updateVote}>vote</button>
const ShowVotes = ({point}) => <p>has {point} votes</p>
const MostVoted = ({mostVotedText, point}) => {
  if (point > 0) {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{mostVotedText}</p>
        <p>has {point} votes</p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>No Votes now.</p>
      </div>
    )
  }
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(7).fill(0))
  const updateSelected = () => {
    setSelected(Math.floor(Math.random() * 6))
  }
  const updateVote = () => {
    setPoints(points.map((point, i) => i === selected ? point + 1 : point))
    // Is there any method make it simple? Just like:
    // points[selected] += 1
  }
  console.log(points.indexOf(Math.max(...points)))
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <ShowVotes point={points[selected]}/>
      <br/>
      <ButtonUpdate updateSelected={updateSelected} />
      <ButtonVote updateVote={updateVote} />
      <MostVoted mostVotedText={anecdotes[points.indexOf(Math.max(...points))]} point={Math.max(...points)} />
    </div>
  )
}

export default App