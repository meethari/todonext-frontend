import React, { useState, useEffect } from 'react';
import SiteNavbar from 'components/SiteNavbar'
import ListSelector from './ListSelector'
import TasksDisplay from './TasksDisplay';
import getTaskActions from './TaskActions';


const TaskManagerPage = () => {

  const [lists, setLists] = useState([])
  const [selectedListId, setSelectedListId] = useState("loading")
  const [taskList, setTaskList] = useState(null)

  const [initTaskList, addTask, deleteTask, setTaskDone] = getTaskActions(setTaskList, taskList)

  const testLists = [
    {listName: "Barcelona Travel", _id:"1"},
    {listName: "College", _id:"2"},
    {listName: "Work", _id:"3"},
    {listName: "Personal", _id:"4"},
  ]

  useEffect(() => {
    initTaskList("60f0db1b70d9dc028502d612")
    setLists(testLists)
    setSelectedListId("2")
  }, [])

  return (
    <>
      <SiteNavbar />
      <div>
        <div style={{ width: "20%", float: 'left' }}>
          <ListSelector lists={lists} selectedListId={selectedListId}/>
        </div>
        <div style={{ width: "80%", float: 'right' }}>
          { taskList ?
            <TasksDisplay tasks={taskList.tasks} listName={taskList.listName}  addTask={addTask} deleteTask={deleteTask} setTaskDone={setTaskDone}/> :
            <div className="nolist">No list is currently selected. Please select a list</div>
          }
        </div>
      </div>

    </>
  )
}




export default TaskManagerPage;
