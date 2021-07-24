import React, { useState, useEffect } from 'react';
import SiteNavbar from 'components/SiteNavbar'
import ListSelector from './ListSelector'
import TasksDisplay from './TasksDisplay';
import getTaskActions from './TaskActions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap'
import testList from './testList.json'



const TaskManagerPage = () => {

  const [lists, setLists] = useState([])
  const [taskList, setTaskList] = useState(null)
  const [modalOpen, setModalState] = useState(false)

  const [initTaskList, addTask, deleteTask, setTaskDone] = getTaskActions(setTaskList, taskList)

  useEffect(() => {
    setTaskList(testList)
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
          <TasksDisplay taskList={taskList} addTask={() => {}} deleteTask={() => {}} setTaskDone={() => {}}/>
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
