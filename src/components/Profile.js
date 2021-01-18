import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import '../css/Profile.css';


class Profile extends Component {

    render() {
        return (
            <div className="profile_div">
                <div className="profile_sideNav">
                    <ButtonGroup vertical>
                        <Button>Edit Profile</Button>
                        <Button>Button</Button>

                        <DropdownButton as={ButtonGroup} title="Lists" id="bg-vertical-dropdown-1">
                        <Dropdown.Item eventKey="1">user.list.title</Dropdown.Item>
                        <Dropdown.Item eventKey="2">user.list.title</Dropdown.Item>
                        </DropdownButton>

                        <Button variant="outline-primary" href='/products'>Back to Products</Button>
                        <Button>Delete Account</Button>

                    </ButtonGroup>
                </div>
                <div className="profile_content">

                    <h1>PROFILE PAGE</h1>

                </div>
            </div>
        );
    }
}

export default Profile;
