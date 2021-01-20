import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import '../css/Profile.css';


class Profile extends Component {

    mapUserList = () => {

        // console.log(this.props.user.lists)
        // debugger
        if (this.props.user){
            return this.props.user.lists.length !== 0 ? this.props.user.lists.map(list_obj => <Dropdown.Item key={list_obj.id} eventKey={list_obj.id}>{list_obj.title}</Dropdown.Item>) : <Dropdown.Item key="1" eventKey="1">No available list</Dropdown.Item>
        }

    }

    render() {
        return (
            <div className="profile_div">
                <div className="profile_sideNav">
                    <ButtonGroup vertical>
                        <Button key="button1" variant="outline-success">Edit Profile</Button>
                        <Button key="button2" variant="outline-success">Button</Button>

                        <DropdownButton key="dropdown" variant="outline-success" as={ButtonGroup} title="Lists" id="bg-vertical-dropdown-1">
                        {this.mapUserList()}
                        {/* {this.props.user.lists.length !== 0 ? <Dropdown.Item eventKey="1">No available list</Dropdown.Item> : this.mapUserList()} */}
                        </DropdownButton>

                        <Button key="button3" variant="outline-success" href='/products'>Back to Products</Button>
                        <Button key="button4" variant="outline-danger" onClick={() => this.props.handleDelete()}>Delete Account</Button>

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
