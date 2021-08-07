import React, {useState} from 'react';
import {Nav, NavItem, NavLink, Button,  Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Col, Row} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import './ListSelector.scss'

const ListSelector = ({lists, selectedListId, addList, deleteList, selectList}) => {
	const [modalOpen, setModalState] = useState(false)

	return (
		<>
			<ModalAddList modalOpen={modalOpen} setModalState={setModalState} addList={addList} />
			<Nav vertical style={{ backgroundColor: '#f1f1f1', minHeight: '100vh' }} className="listSelector">
				{
					lists.map(list => (
						<ListNavItem key={list._id} listId={list._id} isSelected={list._id == selectedListId} listName={list.listName} selectList={selectList} deleteList={deleteList}/>
					))
				}
				<NavItem>
					<NavLink>
						<Button color="primary" onClick={() => { setModalState(true) }}>New List</Button>
					</NavLink>
				</NavItem>
			</Nav>
		</>
	)
}

const ListNavItem = ({listId, isSelected, listName, selectList, deleteList}) => {

	const deleteListHandler = () => {
		console.log('Handler hit')
		deleteList(listId)
	}

	const selectListHandler = () => {
		selectList(listId)
	}

	return (
		<NavItem className="listNavItem">
			<Row>
				<Col sm="9">
					<NavLink className={isSelected ? "active" : ""} onClick={selectListHandler}>{listName}</NavLink>
				</Col>
				<Col sm="3">
					<Button color="danger" className="listDeleteBtn"> <FontAwesomeIcon icon={faTrash} onClick={deleteListHandler}/> </Button>
				</Col>
			</Row>
		</NavItem>
	)
}

const ModalAddList = ({ modalOpen, setModalState, addList }) => {
	
	const [listNameInput, setListNameInput] = useState('')

	const inputHandler = (e) => {
		setListNameInput(e.target.value)
	}
	
	const saveHandler = () => {
		addList({listName: listNameInput})
		setModalState(false)
		setListNameInput('')
	}

	return (
	<Modal isOpen={modalOpen} toggle={() => { setModalState(!modalOpen) }}>
	  <ModalHeader>Create new list:</ModalHeader>
	  <ModalBody>
		<FormGroup>
		  <Label form="inputListName">Name of new list:</Label>
		  <Input name="inputListName" value={listNameInput} onChange={inputHandler}></Input>
		</FormGroup>
	  </ModalBody>
	  <ModalFooter>
		<Button color="danger" onClick={() => { setModalState(false) }}>
		  Cancel
		</Button>
		<Button color="primary" onClick={saveHandler}>Create New List</Button>
	  </ModalFooter>
	</Modal>
  )
}

export default ListSelector