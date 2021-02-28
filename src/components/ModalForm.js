import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/button";
import Form from "react-bootstrap/Form";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";


class ModalForm extends Component {

  state = {
    title: "",
    dropDownTitle: "Select from your lists",
    pickedList: null
  }

  componentDidMount() {
    fetch(`https://splashglam-api.herokuapp.com//users/${this.props.user.id}`,{
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      // debugger
        this.props.updateUserLists(data)
    })

}

  handleChange = (e) => this.setState({ title: e.target.value });


  handleClick = (data) => {
    //   debugger
    fetch(`https://splashglam-api.herokuapp.com//list_products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            list_id: data.id,
            product_id: this.props.product.id
        }),
        })
        .then((resp) => resp.json())
        .then((data) => {
        // debugger
        console.log("ADDED PRODUCT TO EXISTING LIST", data)
        // return <Alert variant="info">Nicely Done! Product added to list!</Alert>
      })
  };

  changeValue= (text) => {
    this.setState({dropDownTitle: text})
  }

  selectedList = (list_obj) => {
    this.setState({pickedList: list_obj})
  }

  mapList = () => {
    
    return this.props.userLists.map((list_obj, index) => (
      <Dropdown.Item
        key={index}
        eventKey={list_obj.id}
        onClick={() => {
            // this.handleClick(list_obj)
            this.changeValue(list_obj.title)
            this.selectedList(list_obj)
        }}
      >
        {list_obj.title}
      </Dropdown.Item>
    ));
  };

  checkInput =() => {
    // debugger
    this.state.title === "" ? this.props.postToExistingList(this.state.pickedList) : this.props.handleTitle(this.state.title)
  }

  render() {

    const { closeModal, isOpen } = this.props;

    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
       
        <>
          <Modal show={isOpen} onHide={closeModal} backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>Give your new list a title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label htmlFor="title">Title: </Form.Label>
                <Form.Control
                  type="text"
                  name="list_name"
                  onChange={this.handleChange}
                  value={this.state.title}
                  placeholder="List Title"
                />

                <Form.Label htmlFor="dropdown">
                  Or Pick from your current lists:
                </Form.Label>

                <DropdownButton
                  key="dropdown"
                  variant="outline-info"
                  title={this.state.dropDownTitle}
                  id="bg-vertical-dropdown-1"
                >
                  {this.props.userLists.length !== 0 ? (
                    this.mapList()
                  ) : (
                    <Dropdown.Item key="no_list" eventKey="1">
                      No list available
                    </Dropdown.Item>
                  )}
                </DropdownButton>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-primary"
                type="submit"
                onClick={() => {this.checkInput()}}
              >
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    );
  }
}

export default ModalForm;
