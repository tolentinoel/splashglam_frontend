import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'


const TopNav = () => {

    return(
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="#home">SplashGlam</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">All Products</Nav.Link>
                </Nav>

            
                <Button variant="outline-primary"><Link to="/profile">Profile</Link></Button>
                <Button variant="outline-danger"><Link to="/login">Logout</Link></Button>

        </Navbar>
    )

}
export default TopNav;