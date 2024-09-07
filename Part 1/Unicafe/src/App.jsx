import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => {
    setGood(good+1)
  }

  const handleNeutralFeedback = () => {
    setNeutral(neutral+1)
  }

  const handleBadFeedback = () => {
    setBad(bad+1)
  }

  const returnAverage = () => {
    const totalFeedback = good + bad + neutral;
    if (totalFeedback === 0) {
      return 0; // Return 0 when there are no feedbacks
    }
    let average = (good-bad)/(good+bad+neutral)
    return average
  }

  const returnPositive = () => {
    const totalFeedback = good + bad + neutral;
    if (totalFeedback === 0) {
      return 0; // Return 0 when there are no feedbacks
    }
    let average = (good)/(totalFeedback)
    return average
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodFeedback}>Good</button><button onClick={handleNeutralFeedback}>Bad</button><button onClick={handleBadFeedback}>Bad</button>
      <h1>statistics</h1>
      <p>good {good}</p> 
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good+bad+neutral}</p>
      <p>average {returnAverage()}</p>
      <p>positive {returnPositive()} %</p>
    </div>
  )
}
 
export default App