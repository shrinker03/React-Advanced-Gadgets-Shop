import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import {Route} from 'react-router-dom'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { logOut } from "../actions/userActions";
import SearchBox from "./SearchBox";

const Header = ({history}) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)

    const {userInfo} = userLogin

    const logOutHandler = () => {
        dispatch(logOut())
    }

    return(
        <header>
            <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect >
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Gadgets Store</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Route render={({history}) => <SearchBox history={history} />} />
                        <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo 
                                ? ( 
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logOutHandler}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                )
                                :
                                <LinkContainer to="/login">
                                    <Nav.Link><i className="fas fa-user"></i> Sign In</Nav.Link>
                                </LinkContainer>
                            }
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminMenu'>
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>        
                            )}                            
                        </Nav>
                    </Navbar.Collapse>
                </Container> 
            </Navbar>
        </header>
    )
};

export default Header;
