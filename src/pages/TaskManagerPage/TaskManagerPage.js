import React, { useState, useEffect } from 'react';
import {Row, Col, Container } from 'reactstrap'

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

  const initListsAndTasks = async () => {

    const apiLists = await axios.get('/api/lists/')
    setLists(apiLists.data)
    if (apiLists.data.length > 0) {
      selectList(apiLists.data[0]._id)
    } else {
      setSelectedListId("no lists")
    }

  }

  const selectList = (listId) => {
    setSelectedListId(listId)
    initTaskList(listId)
  }

  const { initTaskList, addTaskToTaskList: addTask, deleteTaskFromTaskList: deleteTask, setTaskDone } = getTaskActions(setTaskList, taskList)

  const { addListToLists: addList, deleteListFromLists: deleteList } = getListActions({lists, setLists, selectedListId, setSelectedListId, selectList})

  useEffect(() => {
    initListsAndTasks()
  }, [])

  return (
    <>
      <SiteNavbar />
        <Row>
          <Col md="3">
            <ListSelector lists={lists} selectedListId={selectedListId} addList={addList} deleteList={deleteList} selectList={selectList} />
          </Col>
          <Col>
            { 
              (selectedListId !== "no lists" &&  selectedListId !== "loading" && taskList) &&
              <TasksDisplay tasks={taskList.tasks} listName={taskList.listName} addTask={addTask} deleteTask={deleteTask} setTaskDone={setTaskDone} /> 
            }
            {
              (selectedListId === "no lists") &&
              <div className="nolist">You don't have any lists. Create a new one!</div>
            }
            {
              (selectedListId === "loading") &&
              <div className="nolist">Loading...</div>
            }
          </Col>
        </Row>

    </>
  )
}




export default TaskManagerPage;
