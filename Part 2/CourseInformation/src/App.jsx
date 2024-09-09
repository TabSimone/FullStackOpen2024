import React from 'react';

//const Total 

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

const Header = ({ courseName }) => {
  return <h1>{courseName}</h1>;
};


const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        //Every component of a list that renders dynamically needs an id
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <div>
      <p> {part.name} {part.exercises}</p>
    </div>
  );
};


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  };

  return <Course course={course} />;
};

export default App;