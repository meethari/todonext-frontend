import React, {useState, useEffect} from 'react';
import axios from 'axios'

const TasksDisplay = ({ taskList, setTaskList }) => {

	const setTaskListWithLogging = (taskList) => {
		console.log(taskList)
		setTaskList(taskList)
	}

	useEffect(() => {
		// TODO: move init to TaskManagerPage.js
		const getResults = async () => {
			try {
				const response = await axios.get('api/tasks')
				// response.data has the list of json
				setTaskListWithLogging(response.data)
			} catch (e) {
				console.log(e)
			}
		}

		// getResults()

	}, [])


	

	return (
		<div id="app">
			<TodoHeader />
			<TodoForm addTodo={addTodo} /> <br /> {/* Why */}
			<TodoList taskList={taskList} deleteTodo={deleteTodo} setTodoDone={setTodoDone} />
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
			<input id='form__input' type="text" value={input} onChange={changeHandler} />
			<button id='form__submit' onClick={submitHandler}>Add Todo</button>
		</div>
	)
}

const TodoList = ({ taskList, deleteTodo, setTodoDone }) => (
	<ol id='todolist'>
		{taskList.map((task) => (
			<Todo key={task._id} task={task} deleteTodo={deleteTodo} setTodoDone={setTodoDone} />
		))}
	</ol>
)

const Todo = ({ task, deleteTodo, setTodoDone }) => {

	const handleCheckboxChange = (event) => {
		setTodoDone(task._id, event.target.checked)
	}

	const handleSubmit = (event) => {
		deleteTodo(task._id)
	}

	return (
		<li id='todo'>
			<input id='todo__checkbox' type="checkbox" checked={task.done} onChange={handleCheckboxChange}></input>
			<span id='todo__label' style={{ textDecoration: task.done ? "line-through" : "none" }}>{task.text}</span>
			<button id='todo__delete' onClick={handleSubmit}>Delete</button>
		</li>
	)
}

export default TasksDisplay