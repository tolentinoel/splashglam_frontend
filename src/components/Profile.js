import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import '../css/Profile.css';


class Profile extends Component {

mapUserList = () => {
    this.props.user.lists.forEach(list_obj => {
        return <Dropdown.Item eventKey={list_obj.id}>{list_obj.title}</Dropdown.Item>
    })
}
    render() {
        return (
            <div className="profile_div">
                <div className="profile_sideNav">
                    <ButtonGroup vertical>
                        <Button variant="outline-success">Edit Profile</Button>
                        <Button variant="outline-success">Button</Button>

                        <DropdownButton variant="outline-success" as={ButtonGroup} title="Lists" id="bg-vertical-dropdown-1">
                        {this.mapUserList()}

                        <Dropdown.Item eventKey="2">user.list.title</Dropdown.Item>
                        </DropdownButton>

                        <Button variant="outline-success" href='/products'>Back to Products</Button>
                        <Button variant="outline-danger" onClick={() => this.props.handleDelete()}>Delete Account</Button>

                    </ButtonGroup>
                </div>
                <div className="profile_content">
                    <h1>Hey {this.props.user.username}!</h1>

                    <h5>Skin Type: {this.props.user.skin_type}</h5>

                    <h5>Name: {this.props.user.name}</h5>
                </div>
            </div>
        );
    }
}

export default Profile;
