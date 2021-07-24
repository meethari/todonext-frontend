import React from 'react';
import {Nav, NavItem, NavLink, Button} from 'reactstrap'

const ListSelector = ({ setModalState }) => {
	return (
		<Nav vertical style={{ backgroundColor: '#f1f1f1', minHeight: '100vh' }}>
			<NavItem>
				<NavLink href="#">Link</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href="#">Link</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href="#">Another Link</NavLink>
			</NavItem>
			<NavItem>
				<NavLink disabled href="#">Disabled Link</NavLink>
			</NavItem>
			<NavItem>
				<NavLink>
					<Button color="primary" onClick={() => { setModalState(true) }}>New List</Button>
				</NavLink>
			</NavItem>
		</Nav>
	)
}

export default ListSelector