import React, { useState, useEffect } from 'react';
import SiteNavbar from 'components/SiteNavbar'
import ListSelector from './ListSelector'
import TasksDisplay from './TasksDisplay';
import getTaskActions from './TaskActions';
import getListActions from './ListActions';
import axios from 'axios';


const TaskManagerPage = () => {

  const [lists, setLists] = useState([])
  const [selectedListId, setSelectedListId] = useState("loading")
  const [taskList, setTaskList] = useState(null)


  const { initTaskList, addTaskToTaskList: addTask, deleteTaskFromTaskList: deleteTask, setTaskDone } = getTaskActions(setTaskList, taskList)

  const { addListToLists: addList, deleteListFromLists: deleteList } = getListActions(lists, setLists, selectedListId, setSelectedListId)

  const initListsAndTasks = async () => {

    const apiLists = await axios.get('/api/lists/')
    setLists(apiLists.data)
    if (apiLists.data.length > 0) {
      selectList(apiLists.data[0]._id)
    }

  }

  const selectList = (listId) => {
    setSelectedListId(listId)
    initTaskList(listId)
  }

  useEffect(async () => {
    initListsAndTasks()
  }, [])

  return (
    <>
      <SiteNavbar />
      <div>
        <div style={{ width: "20%", float: 'left' }}>
          <ListSelector lists={lists} selectedListId={selectedListId} addList={addList} deleteList={deleteList} selectList={selectList} />
        </div>
        <div style={{ width: "80%", float: 'right' }}>
          {taskList ?
            <TasksDisplay tasks={taskList.tasks} listName={taskList.listName} addTask={addTask} deleteTask={deleteTask} setTaskDone={setTaskDone} /> :
            <div className="nolist">No list is currently selected. Please select a list</div>
          }
        </div>
      </div>

    </>
  )
}




export default TaskManagerPage;
