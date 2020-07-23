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
    <>
        <TodoHeader />
        <TodoForm addTodo={addTodo}/>
        <TodoList messageList={messageList} deleteTodo={deleteTodo}/>
    </>
  );
}

const TodoHeader = () => (
  <h2>Todo List</h2>
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
    <>
      <input type="text" value={input} onChange={changeHandler}/>
      <button onClick={submitHandler}>Add Todo</button>
    </>
  )
}

const TodoList = ({ messageList, deleteTodo}) => (
  <ol>
    {messageList.map((message) => (
      <Todo message={message} deleteTodo={deleteTodo} />
    ))}
  </ol>
)
 
const Todo = ({ message, deleteTodo}) => {
  
  const handleSubmit = (event) => {
    deleteTodo(message)
  }

  return (
  <li>
    {message + "  "}
    <button onClick={handleSubmit}>Delete</button>
  </li>
)}

export default App;
