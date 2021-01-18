import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import '../css/TopNav.css';
// import {Link} from 'react-router-dom';


const TopNav = ({loggedIn, createList, handleLogout, renderProfilePage}) => {

    return(
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="/">SplashGlam</Navbar.Brand>

                {loggedIn ?
                    <Nav>
                    <Button variant="outline-primary"><Nav.Link href="/login">Log In</Nav.Link></Button>
                    <Button variant="outline-primary"><Nav.Link href="/signup">Sign Up</Nav.Link></Button>
                    </Nav>
                    :
                    <Nav>
                        <Button variant="outline-primary" onClick={() => createList()}>Create A List</Button>
                        <Button variant="outline-primary" onClick={() => renderProfilePage()}>Profile</Button>
                        <Button variant="outline-danger" onClick={() => handleLogout()}>Logout</Button>
                    </Nav>
                    
                    
                }
        </Navbar>
    )

}
export default TopNav;