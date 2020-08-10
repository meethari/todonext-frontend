import React, {useState} from 'react';
import './App.css';

const App = () => (
  <TodoApp />
)
 
const TodoApp = () => {

  const [messageList, setMessageList] = useState(["Milk", "Sugar", "Butter"])

  const addTodo = (message) => {
    setMessageList([...messageList, message])
  }

  const deleteTodo = (message) => {
    let deleteMessageIndex = messageList.indexOf(message)
    setMessageList([...messageList.slice(0, deleteMessageIndex), ...messageList.slice(deleteMessageIndex+1)])
  }

  return (
    <div id="app">
        <TodoHeader />
        <TodoForm addTodo={addTodo}/> <br/> {/* Why */}
        <TodoList messageList={messageList} deleteTodo={deleteTodo}/>
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

const TodoList = ({ messageList, deleteTodo}) => (
  <ol id='todolist'>
    {messageList.map((message, index) => (
      <Todo message={message} deleteTodo={deleteTodo} key={index}/>
    ))}
  </ol>
)
 
const Todo = ({ message, deleteTodo}) => {
  
  const handleSubmit = (event) => {
    deleteTodo(message)
  }

  return (
  <li id='todo'>
    <span id='todo__label'>{message + "  "}</span>
    <button id='todo__delete' onClick={handleSubmit}>Delete</button>
  </li>
)}

const Footer = () => (
  <div id="footer">
    <a href="http://github.com/meethari" target="_blank" rel="noopener noreferrer">Github: meethari</a>
  </div>
  
)

export default App;
