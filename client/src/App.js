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

  const findTaskIndex = (id) => {
    var taskIndex = -1
    for (var i = 0; i < taskList.length; i++) {
      if (taskList[i]._id === id) {
        taskIndex = i;
        break;
      }
    }
    return taskIndex
  }

  const deleteTodo = (id) => {
    const deleteTaskIndex = findTaskIndex(id)
    setTaskList([...taskList.slice(0, deleteTaskIndex), ...taskList.slice(deleteTaskIndex+1)])
  }

  const setTodoDone = (id, state) => {
    const editTaskIndex = findTaskIndex(id)
    const newTask = {
      ...taskList[editTaskIndex]
    }
    newTask.done = state
    setTaskList([...taskList.slice(0, editTaskIndex), newTask, ...taskList.slice(editTaskIndex+1)])
  }

  return (
    <div id="app">
        <TodoHeader />
        <TodoForm addTodo={addTodo}/> <br/> {/* Why */}
        <TodoList taskList={taskList} deleteTodo={deleteTodo} setTodoDone={setTodoDone}/>
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

const TodoList = ({ taskList, deleteTodo, setTodoDone}) => (
  <ol id='todolist'>
    {taskList.map((task) => (
      <Todo key={task._id} task={task} deleteTodo={deleteTodo} setTodoDone={setTodoDone}/>
    ))}
  </ol>
)
 
const Todo = ({ task, deleteTodo, setTodoDone}) => {

  const handleCheckboxChange = (event) => {
    setTodoDone(task._id, event.target.checked)
  }
  
  const handleSubmit = (event) => {
    deleteTodo(task._id)
  }

  return (
  <li id='todo'>
    <input id='todo__checkbox' type="checkbox" checked={task.done} onChange={handleCheckboxChange}></input>
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
