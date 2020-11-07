import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';


const App = () => (
  <TodoApp />
)
 
const TodoApp = () => {

  const [taskList, setTaskList] = useState([])

  useEffect(() => {
    const getResults = async () => {
      try {
        const response = await axios.get('api/tasks')
        // response.data has the list of json
        setTaskList(response.data)
      } catch(e) {
        console.log(e)
      }
    }
    
    getResults()
    
  }, [])

  const addTodo = (message) => {
    setTaskList([...taskList, {_id: "lil_yachty", done: false, text: message}])

    // TODO: make API call

    // TODO: set ID
  }

  const deleteTodo = (id) => {
    var deleteTaskIndex = -1
    for (var i = 0; i < taskList.length; i++) {
      console.log(taskList[i]._id)
      if (taskList[i]._id === id) {
        deleteTaskIndex = i;
        break;
      }
    }
    
    setTaskList([...taskList.slice(0, deleteTaskIndex), ...taskList.slice(deleteTaskIndex+1)])
  }

  return (
    <div id="app">
        <TodoHeader />
        <TodoForm addTodo={addTodo}/> <br/> {/* Why */}
        <TodoList taskList={taskList} deleteTodo={deleteTodo}/>
        <Footer/>
    </div>
  );
}

const TodoHeader = () => (
  <div id="header">
    <h2>Todo List</h2>
  </div>

)
 
const TodoForm = ({ addTodo }) => {

  const [input, setInput] = useState("")

  const changeHandler = (event) => {
    setInput(event.target.value)
  }

  const submitHandler = (event) => {
    addTodo(input)
    setInput("")
  }

  return (
    <div id='form'>
      <input id='form__input' type="text" value={input} onChange={changeHandler}/>
      <button id='form__submit' onClick={submitHandler}>Add Todo</button>
    </div>
  )
}

const TodoList = ({ taskList, deleteTodo}) => (
  <ol id='todolist'>
    {taskList.map((task) => (
      <Todo task={task} deleteTodo={deleteTodo}/>
    ))}
  </ol>
)
 
const Todo = ({ task, deleteTodo}) => {
  
  const handleSubmit = (event) => {
    deleteTodo(task._id)
  }

  return (
  <li key={task._id} id='todo'>
    <input id='todo__checkbox' type="checkbox" checked={task.done}></input>
    <span id='todo__label'>{task.text}</span>
    <button id='todo__delete' onClick={handleSubmit}>Delete</button>
  </li>
)}

const Footer = () => (
  <div id="footer">
    <a href="http://github.com/meethari" target="_blank" rel="noopener noreferrer">Github: meethari</a>
  </div>
  
)

export default App;
