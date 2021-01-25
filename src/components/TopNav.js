import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import '../css/TopNav.css';



const TopNav = ({loggedIn, handleLogout, renderProfilePage, toggleDark}) => {

    return(
        <Navbar className="topnav" variant="light">
            <Navbar.Brand href="/"><h3 className="brand_text">SplashGlam</h3></Navbar.Brand>
            <Button className="toggle" variant="outline-dark" onClick={() => toggleDark()} size="sm">Toggle theme</Button>
                {/* <label>
                    <input type="checkbox"/>
                    <span class="check"> </span>
                </label> */}
                {loggedIn ?
                    <Nav className="topnav_btn_div">
                        
                        <Button className="profile_btn" variant="outline-info" onClick={() => renderProfilePage()} size="sm"><Nav.Link href="/profile">Profile</Nav.Link></Button>
                        <Button className="profile_btn" variant="outline-info" onClick={() => handleLogout()} size="sm"><Nav.Link href="/login">Logout</Nav.Link></Button>
                    </Nav>
                     :
                    <Nav className="topnav_btn_div">
                        <Button className="profile_btn" variant="outline-info" size="sm"><Nav.Link href="/login">Log In</Nav.Link></Button>
                        <Button className="profile_btn" variant="outline-info" size="sm"><Nav.Link href="/signup">Sign Up</Nav.Link></Button>
                    </Nav>


                }
        </Navbar>
    )

}
export default TopNav;