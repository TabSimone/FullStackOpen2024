import React from 'react';

const Index = ({ courses }) => {
  return (
    <div>
      {courses.map(course => (
        //Every component of a list that renders dynamically needs an id
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};


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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Index courses={courses} />;
}

export default App;