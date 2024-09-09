import React from 'react'

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
    const total = parts.reduce(function (total, part) {
        return total +
            part.exercises
    }, 0);


    return <p><b> total of {total} exercises </b></p>
};

export default Course;