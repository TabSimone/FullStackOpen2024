import { useState } from 'react';

// Statistics Component
const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad;

  const returnAverage = () => {
    if (totalFeedback === 0) {
      return 0; // Return 0 when there are no feedbacks
    }
    return (good - bad) / totalFeedback;
  };

  const returnPositive = () => {
    if (totalFeedback === 0) {
      return 0; // Return 0 when there are no feedbacks
    }
    return (good / totalFeedback) * 100; // Return percentage
  };
  
  if(totalFeedback === 0){
    return (
      <div>
        <p>No feedbacks</p>
      </div>
    );

  }
  return (
    <div>
      
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {totalFeedback}</p>
      <p>Average: {returnAverage()}</p>
      <p>Positive: {returnPositive()} %</p>
    </div>
  );
};

// App Component
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodFeedback = () => {
    setGood(good + 1);
  };

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1);
  };

  const handleBadFeedback = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGoodFeedback}>Good</button>
      <button onClick={handleNeutralFeedback}>Neutral</button>
      <button onClick={handleBadFeedback}>Bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;