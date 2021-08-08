import Api from 'utilities/api'

function getTaskActions(setTaskList, taskList) {

	const api = new Api()

	const initTaskList = async (listId) => {
		const response = await api.get(`/api/lists/${listId}`)
		setTaskList(response.data)
	}

	const addTaskToTaskList = async (task) => {
		const response = await api.post(`/api/lists/${taskList._id}/tasks/`, task)
		// response.data is the task
		const newTaskList = {...taskList, tasks: [...taskList.tasks, response.data]}
		setTaskList(newTaskList)
	}

	const deleteTaskFromTaskList = async (id) => {

		// find index of task in taskList where id === task.id
		const deleteTaskIndex = taskList.tasks.findIndex(task => task._id === id)
		const newTaskList = {...taskList, tasks: [...taskList.tasks.slice(0, deleteTaskIndex), ...taskList.tasks.slice(deleteTaskIndex + 1)]}
		setTaskList(newTaskList)
		const response = await api.delete(`/api/lists/${taskList._id}/tasks/${id}`)
		if (response.status != 200) {
			throw 'deleteTodo: deleting task from mongo failed. Please refresh the app.'
		}
		
	}

	const setTaskDone = async (id, isDone) => {

		// This handler updates the done property of the task in mongo, and updates it in the UI in parallel

		const editTaskIndex = taskList.tasks.findIndex(task => task._id === id)
		const newTask = {
			...taskList.tasks[editTaskIndex]
		}
		newTask.done = isDone

		// Update UI
		const newTaskList = {...taskList, tasks: [...taskList.tasks.slice(0, editTaskIndex), newTask, ...taskList.tasks.slice(editTaskIndex + 1)]}
		setTaskList(newTaskList)

		const response = await api.patch(`/api/lists/${taskList._id}/tasks/${newTask._id}`, newTask)

		if (response.status === 200) {
			console.log('setTodoDone: task\'s done status was updated in MongoDB')
		} else {
			throw 'setTodoDone: errror while updating task\'s done status in MongoDB. Please refresh the app.'
		}

	}


	return {initTaskList, addTaskToTaskList, deleteTaskFromTaskList, setTaskDone}

}

export default getTaskActions;