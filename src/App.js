import React, { useState, useEffect } from 'react';
import { GiHornedHelm } from "react-icons/gi";
import { AiOutlinePlus, AiOutlineClose, AiFillEdit } from "react-icons/ai";
import './App.css';

function App() {
  const [tasks, settasks] = useState([]);
  const [input, setinput] = useState("");
  const [currentDate, setCurrentDate] = useState('');


  useEffect(() => {
    const date = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const monthOfYear = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();
    setCurrentDate(`${dayOfWeek}, ${dayOfMonth}${getOrdinalSuffix(dayOfMonth)} ${monthOfYear}, ${year}`);
  }, []);

  function getOrdinalSuffix(dayOfMonth) {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const lastDigit = dayOfMonth % 10;
    const suffix = suffixes[lastDigit] || suffixes[0];
    return suffix;
  }  

  useEffect(() => {
    const textbox = document.getElementById('textbox');
    if (textbox) {
      textbox.addEventListener('keyup', handleKeyUp);
    }
    return () => {
      if (textbox) {
        textbox.removeEventListener('keyup', handleKeyUp);
      }
    };
  }, []);

  function handleKeyUp(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  function handleSubmit(event) {
  event.preventDefault();
  if (input.trim() !== '') {
    settasks([...tasks, input]);
    setinput('');
  }
}

  const deleteTask = (index) => {
    const newTasks = [...tasks].filter((task, i) => i !== index);
    settasks(newTasks);
  }

  const editTask = (index) => {
    const newTasks = [...tasks].map((task, i) => {
      if (i === index) {
        return prompt("Enter new task", task);
      } else {
        return task;
      }
    });
    if (newTasks[index] === "") {
      deleteTask(index);
    }
    settasks(newTasks);
  }


  return (
    <div className="app">
      <div className="container">
        <h1><GiHornedHelm />TaskMaster</h1>
        <p className='mydate'>{currentDate}</p>
        <form onSubmit={handleSubmit}>
          {/* <AiOutlinePlus onClick={handleSubmit}/> */}
          <input id='textbox' value={input} onChange={e => setinput(e.target.value)} type="text" placeholder='Enter a task' autoFocus/>
        </form>
        <div className='tasks-container'>
          {tasks.map((task, index) => (
            <div key={index} className="task" >
              <input type="checkbox" /> 
              <p>{task}</p>
              <AiFillEdit onClick={() => editTask(index)}/>
              <AiOutlineClose onClick={() => deleteTask(index)}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
