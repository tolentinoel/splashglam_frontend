import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'


const TopNav = () => {

    return(
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="#home">SplashGlam</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Profile</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>

                <Button variant="outline-primary">Logout</Button>

        </Navbar>
    )

}
export default TopNav;