import React, {useState} from 'react';
import './App.css';

function App() {

  const [input, setInput] = useState("")
  const [messageList, setMessageList] = useState(["Milk", "Sugar", "Butter"])

  const inputHandler = (event) => {
    setInput(event.target.value)
  }

  const submitHandler = (event) => {
    setMessageList([...messageList, input])
    setInput("")
  }

  const generateDeleteMessage = message => ((event) => {
    const splitIndex = messageList.indexOf(message)
    setMessageList([...messageList.slice(0, splitIndex), ...messageList.slice(splitIndex + 1)])
  })

  return (
    <div>
        <input type="text" value={input} onChange={inputHandler}/>
        <button onClick={submitHandler}>Add</button>
        <DisplayList {...{messageList, generateDeleteMessage}} />
    </div>
  );
}


const DisplayList = ({ messageList, generateDeleteMessage }) => (
  <ol>
    {messageList.map((message) => (
      
      <li>
        <span>{message}  </span>
        <button onClick={generateDeleteMessage(message)}>Delete</button>
      </li>
    
    ))}
  </ol>
  
)


export default App;
