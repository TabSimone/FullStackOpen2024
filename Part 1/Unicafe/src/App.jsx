import { useState } from 'react';


// Statistics Component
/*
const Button = ({ props }) => {
  return <button>{props.text}</button>
};*/

const Button = ({ actionToDo, text }) => {
  return <button onClick={actionToDo}>{text}</button>;
};

const StatisticLine = (props) => {
  return <tr> <td style={{ textAlign: 'left' }}>{props.text} </td> <td style={{ textAlign: 'left' }}> {props.value}</td> </tr>
};

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
      <h1>Statistics</h1>
      <table>
      <StatisticLine text="Good" value ={good} />
      <StatisticLine text="Neutral" value ={neutral} />
      <StatisticLine text="Bad" value ={bad} />
      <StatisticLine text="All" value ={totalFeedback} />
      <StatisticLine text="Average" value ={returnAverage()} />
      <StatisticLine text="Positive" value={`${returnPositive()} %`} />
      </table>
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
      <Button actionToDo={handleGoodFeedback} text='Good' />
      <Button actionToDo={handleNeutralFeedback} text='Neutral' />
      <Button actionToDo={handleBadFeedback} text='Bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;