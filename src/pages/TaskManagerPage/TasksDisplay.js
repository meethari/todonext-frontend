import React, { useState } from 'react';
import axios from 'axios'
import './TasksDisplay.css'

const TasksDisplay = ({ taskList, addTask, deleteTask, setTaskDone }) => {
	if (taskList) {
		return (
			<div id="app">
				<Header listName={taskList.listName} />
				<AddTaskForm addTask={addTask} /> <br /> {/* Why */}
				<TaskOrderedList tasks={taskList.tasks} deleteTask={deleteTask} setTaskDone={setTaskDone} />
			</div>
		);
	} else {
		return <div className="nolist">No list is currently selected. Please select a list</div>;
	}
}




const Header = ({listName}) => (
	<div id="header">
		<h2>{listName}</h2>
	</div>

)

const AddTaskForm = ({ addTask }) => {

	const [input, setInput] = useState("")

	const changeHandler = (event) => {
		setInput(event.target.value)
	}

	const submitHandler = (event) => {
		addTask(input)
		setInput("")
	}

	return (
		<div id='form'>
			<input id='form__input' type="text" value={input} onChange={changeHandler} />
			<button id='form__submit' onClick={submitHandler}>Add Task</button>
		</div>
	)
}

const TaskOrderedList = ({ tasks, deleteTask, setTaskDone }) => (
	<ol id='todolist'>
		{tasks.map((task) => (
			<TaskItem key={task._id} task={task} deleteTask={deleteTask} setTaskDone={setTaskDone} />
		))}
	</ol>
)

const TaskItem = ({ task, deleteTask, setTaskDone }) => {

	const handleCheckboxChange = (event) => {
		setTaskDone(task._id, event.target.checked)
	}

	const handleSubmit = (event) => {
		deleteTask(task._id)
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