import React from 'react';

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
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

const Total = ({ parts }) => {
  //For loop
  /*
  for(let i = 0; i<parts.length; i++){
    total = total + parts[i]['exercises']
  }*/

  //When you perform comulative operation on arrays use reduce
  const total = parts.reduce(function(total, part) {
    return total + 
    part.exercises
  } , 0);


  return <p><b> total of {total} exercises </b></p>
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
        exercises: 44,
        id: 3
      },
      {
        name: 'State of a component part 2',
        exercises: 11,
        id: 4
      }
    ]
  };

  return <Course course={course} />;
};

export default App;