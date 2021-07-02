import React, {useState, useEffect} from 'react';
import SiteNavbar from 'components/SiteNavbar'
import {Nav, NavItem, NavLink, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap'
import axios from 'axios'


const App = () => {

    const [taskList, setTaskList] = useState([])
    const [modalOpen, setModalState] = useState(false)

    return (
    <>
      <ModalAddList modalOpen={modalOpen} setModalState={setModalState} />
      <SiteNavbar/>
      <div>
        <div style={{width: "20%", float: 'left'}}>
          <ListSelector setModalState={setModalState}/>
        </div>
        <div style={{width: "80%", float: 'right'}}>
          <TodoListDisplay taskList={taskList} setTaskList={setTaskList} />
        </div>
      </div>
      
    </>
  )
}

const ModalAddList = ({modalOpen, setModalState}) =>  (
  <Modal isOpen={modalOpen} toggle={() => {setModalState(!modalOpen)}}>
    <ModalHeader>Create new list:</ModalHeader>
    <ModalBody>
      <FormGroup>
        <Label form="inputListName">Name of new list:</Label>
        <Input name="inputListName"></Input>
      </FormGroup>
    </ModalBody>
    <ModalFooter>
    <Button onClick={() => {setModalState(!modalOpen)}}>
        Close
    </Button>
    <Button color="primary">Save changes</Button>
    </ModalFooter>
  </Modal>
)

const ListSelector = ({setModalState}) => {
  return (
    <Nav vertical style={{backgroundColor: '#f1f1f1', minHeight: '100vh'}}>
      <NavItem>
        <NavLink href="#">Link</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">Link</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">Another Link</NavLink>
      </NavItem>
      <NavItem>
        <NavLink disabled href="#">Disabled Link</NavLink>
      </NavItem>
      <NavItem>
        <NavLink>
          <Button color="primary" onClick={() => {setModalState(true)}}>New List</Button>
        </NavLink>
      </NavItem>
    </Nav>
  )
}
 
const TodoListDisplay = ({taskList, setTaskList}) => {

  const setTaskListWithLogging = (taskList) => {
    console.log(taskList)
    setTaskList(taskList)
  }

  useEffect(() => {
    const getResults = async () => {
      try {
        const response = await axios.get('api/tasks')
        // response.data has the list of json
        setTaskListWithLogging(response.data)
      } catch(e) {
        console.log(e)
      }
    }
    
    getResults()
    
  }, [])

  const addTodo = async (message) => {


    // make API call
    const newTask = {text: message, done: false}

    const addTaskToMongo = async () => {
      const response = await axios.post('/api/tasks', newTask)
      return response.data
    }

    const taskWithMongoID = await addTaskToMongo()

    // Add returned task to task list

    setTaskListWithLogging([...taskList, taskWithMongoID])

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

    // This handler deletes the task in Mongo and removes it from the UI in parallel.

    const deleteTaskFromMongo = async (id) => {
      const response = await axios.delete(`/api/tasks/${id}`)
      if (response.status === 200) {
        console.log('deleteTodo: deleted task from mongo successfully')
      } else {
        console.log('deleteTodo: deleting task from mongo failed. Please refresh the app.')
      }
    }

    deleteTaskFromMongo(id)

    const deleteTaskIndex = findTaskIndex(id)
    setTaskListWithLogging([...taskList.slice(0, deleteTaskIndex), ...taskList.slice(deleteTaskIndex+1)])
  }

  const setTodoDone = (id, isDone) => {

    // This handler updates the done property of the task in mongo, and updates it in the UI in parallel

    const editTaskIndex = findTaskIndex(id)
    const newTask = {
      ...taskList[editTaskIndex]
    }
    newTask.done = isDone

    const updateTaskInMongo = async (newTask) => {
      const response = await axios.patch(`/api/tasks/${newTask._id}`, newTask)
      
      if (response.status === 200) {
        console.log('setTodoDone: task\'s done status was updated in MongoDB')
      } else {
        console.log('setTodoDone: errror while updating task\'s done status in MongoDB. Please refresh the app.')
      }
    }

    // Update Mongo
    updateTaskInMongo(newTask)

    // Update UI
    setTaskListWithLogging([...taskList.slice(0, editTaskIndex), newTask, ...taskList.slice(editTaskIndex+1)])
  }

  return (
    <div id="app">
        <TodoHeader />
        <TodoForm addTodo={addTodo}/> <br/> {/* Why */}
        <TodoList taskList={taskList} deleteTodo={deleteTodo} setTodoDone={setTodoDone}/>
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
    <span id='todo__label' style={{textDecoration: task.done ? "line-through" : "none"}}>{task.text}</span>
    <button id='todo__delete' onClick={handleSubmit}>Delete</button>
  </li>
)}

export default App;
