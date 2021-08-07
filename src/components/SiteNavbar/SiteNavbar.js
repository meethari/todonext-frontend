import React,  {useState} from 'react'

import {useAuth} from 'context/Auth'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

const SiteNavbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const {authTokens, setAuthTokens} = useAuth()

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="site-navbar">
            <Navbar color="light" light expand="md" fixed="top">
                <NavbarBrand href="/">ToDoNext</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        { authTokens ?
                            (   
                                <NavItem>
                                    <NavLink href="/logout">Log Out</NavLink>
                                </NavItem>
                            ) :
                            (
                                <>
                                    <NavItem>
                                        <NavLink href="/register">Sign Up</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/login">Log In</NavLink>
                                    </NavItem>
                                </>
                            )

                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default SiteNavbar