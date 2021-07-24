function getTaskActions(setTaskList, taskList) {

	const addTaskToTaskList = (task) => {
		const response = await axios.post(`/api/lists/${currentListId}/tasks/`, task)
		// response.data is the task
		const newTaskList = {...taskList, tasks: [...taskList.tasks, response.data]}
		setTaskList(newTaskList)
	}

	const deleteTaskFromTaskList = (id) => {

		const response = await axios.delete(`/api/lists/${taskList._id}/tasks/${id}`)
		if (response.status === 200) {
			// find index of task in taskList where id === task.id
			const deleteTaskIndex = taskList.findIndex(task => task.id === id)
			const newTaskList = {...taskList, tasks: [...taskList.tasks.slice(0, deleteTaskIndex), ...taskList.tasks.slice(deleteTaskIndex + 1)]}
			setTaskList(newTaskList)
		} else {
			throw 'deleteTodo: deleting task from mongo failed. Please refresh the app.'
		}
		
	}

	const setTaskDone = (id) => {

		// This handler updates the done property of the task in mongo, and updates it in the UI in parallel

		const editTaskIndex = taskList.findIndex(task => task.id === id)
		const newTask = {
			...taskList[editTaskIndex]
		}
		newTask.done = isDone

		const response = await axios.patch(`/api/lists/${taskList._id}/tasks/${newTask._id}`, newTask)

		if (response.status === 200) {
			console.log('setTodoDone: task\'s done status was updated in MongoDB')
			// Update UI
			const newTaskList = {...taskList, tasks: [...taskList.tasks.slice(0, editTaskIndex), newTask, ...taskList.tasks.slice(editTaskIndex + 1)]}
			setTaskList(newTaskList)
		} else {
			throw 'setTodoDone: errror while updating task\'s done status in MongoDB. Please refresh the app.'
		}

	}


	return [addTaskToTaskList, deleteTaskFromTaskList, setTaskDone]

}

export default getTaskActions;