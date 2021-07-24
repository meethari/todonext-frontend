import React, {useState} from 'react';
import SiteNavbar from 'components/SiteNavbar'
import ListSelector  from 'pages/TaskManagerPage/ListSelector'
import TasksDisplay  from 'pages/TaskManagerPage/TasksDisplay';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap'



const TaskManagerPage = () => {

    const [lists, setLists] = useState([])
    const [tasks, setTasks] = useState([])
    const [modalOpen, setModalState] = useState(false)

    return (
    <>
      <ModalAddList modalOpen={modalOpen} setModalState={setModalState} />
      <SiteNavbar/>
      <div>
        <div style={{width: "20%", float: 'left'}}>
          <ListSelector setModalState={setModalState}/>
        </div>
        <div style={{width: "80%", float: 'right'}}>
          <TasksDisplay taskList={tasks} setTaskList={setTasks} />
        </div>
      </div>
      
    </>
  )
}

const ModalAddList = ({modalOpen, setModalState}) =>  (
  <Modal isOpen={modalOpen} toggle={() => {setModalState(!modalOpen)}}>
    <ModalHeader>Create new list:</ModalHeader>
    <ModalBody>
      <FormGroup>
        <Label form="inputListName">Name of new list:</Label>
        <Input name="inputListName"></Input>
      </FormGroup>
    </ModalBody>
    <ModalFooter>
    <Button onClick={() => {setModalState(!modalOpen)}}>
        Close
    </Button>
    <Button color="primary">Save changes</Button>
    </ModalFooter>
  </Modal>
)


 

export default TaskManagerPage;
