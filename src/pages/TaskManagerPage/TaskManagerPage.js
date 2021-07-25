import React, { useState, useEffect } from 'react';
import SiteNavbar from 'components/SiteNavbar'
import ListSelector from './ListSelector'
import TasksDisplay from './TasksDisplay';
import getTaskActions from './TaskActions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap'



const TaskManagerPage = () => {

  const [lists, setLists] = useState([])
  const [taskList, setTaskList] = useState(null)
  const [modalOpen, setModalState] = useState(false)

  const [initTaskList, addTask, deleteTask, setTaskDone] = getTaskActions(setTaskList, taskList)

  useEffect(() => {
    initTaskList("60f0db1b70d9dc028502d612")
  }, [])

  return (
    <>
      <ModalAddList modalOpen={modalOpen} setModalState={setModalState} />
      <SiteNavbar />
      <div>
        <div style={{ width: "20%", float: 'left' }}>
          <ListSelector setModalState={setModalState} />
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

const ModalAddList = ({ modalOpen, setModalState }) => (
  <Modal isOpen={modalOpen} toggle={() => { setModalState(!modalOpen) }}>
    <ModalHeader>Create new list:</ModalHeader>
    <ModalBody>
      <FormGroup>
        <Label form="inputListName">Name of new list:</Label>
        <Input name="inputListName"></Input>
      </FormGroup>
    </ModalBody>
    <ModalFooter>
      <Button onClick={() => { setModalState(!modalOpen) }}>
        Close
      </Button>
      <Button color="primary">Save changes</Button>
    </ModalFooter>
  </Modal>
)




export default TaskManagerPage;
