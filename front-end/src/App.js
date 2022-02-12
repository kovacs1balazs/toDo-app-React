import React from 'react';
import './App.css';
import { useState, useEffect} from 'react';
import axios from 'axios';



function App() {
  const [cards, setCards] = useState([]);

  async function getData() {
    const response = await axios.get("http://localhost:6789/tasks");
    setCards(response.data);
    console.log(response.data);
    return response;
  }
  
  useEffect(() => {
    getData();
  }, []);

  
  const [task, setTask] = useState("");
    
  const createTask = async () => {
    await axios.post("http://localhost:6789/tasks", {
      title: task   
    })
    setTask("");
    getData();

  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:6789/tasks/${id}`)
    getData();
  };

  return (
    <>
      <h1>ToDo List</h1>
      <div id="menu">
        <label>Your new to-do</label>
        <input value={task} onChange={(e) => setTask(e.target.value)} type="text" placeholder="enter new task"/>
        <button onClick={createTask}>add task</button>
      </div>
      <div id="list">         
        {cards.map((card, index) => <> <li key={index}>{card.title}</li> <button onClick={() => deleteTask(card.id)}>delete</button> </>)}
      <div>
                    
        <br></br>
        </div>
      </div>
    </>
  );
}

export default App;
