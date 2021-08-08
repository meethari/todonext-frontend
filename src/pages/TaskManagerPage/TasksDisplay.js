import React, { useState } from 'react';
import './TasksDisplay.scss'

const TasksDisplay = ({ tasks, listName, addTask, deleteTask, setTaskDone }) => (
	<div class="tasks-display">
		<Header listName={listName} />
		<AddTaskForm addTask={addTask} /> <br /> {/* Why */}
		<TaskOrderedList tasks={tasks} deleteTask={deleteTask} setTaskDone={setTaskDone} />
	</div>
);

const Header = ({ listName }) => (
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
		addTask({text: input})
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