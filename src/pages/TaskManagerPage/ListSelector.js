import React, {useState} from 'react';
import {Nav, NavItem, NavLink, Button,  Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from 'reactstrap'

import './ListSelector.css'

const ListSelector = ({lists, selectedListId}) => {
	const [modalOpen, setModalState] = useState(false)

	return (
		<>
			<ModalAddList modalOpen={modalOpen} setModalState={setModalState} />
			<Nav vertical style={{ backgroundColor: '#f1f1f1', minHeight: '100vh' }}>
				{
					lists.map(list => (
						<NavItem key={list._id}>
							<NavLink className={list._id == selectedListId && "active bg-primary"}>{list.listName}</NavLink>
						</NavItem>
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

export default ListSelector