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
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                </Nav>

                <Button variant="outline-primary"><Link to="/">Home</Link></Button>
                <Button variant="outline-primary"><Link to="/profile">Profile</Link></Button>

        </Navbar>
    )

}
export default TopNav;