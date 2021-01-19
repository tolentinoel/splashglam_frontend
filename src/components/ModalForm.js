import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/button";
import Form from "react-bootstrap/Form";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
// import Alert from "react-bootstrap/Alert";

class ModalForm extends Component {

  state = {
    title: ""
  }

  componentDidMount() {
    fetch(`http://localhost:3000/users/${this.props.user.id}`,{
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => res.json())
    .then(data => {
        this.props.updateUserLists(data)
        // debugger
    })

}

  handleChange = (e) => this.setState({ title: e.target.value });


  handleClick = (list) => {
    fetch(`http://localhost:3000/lists/${list.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        products: [...list.list_products, this.props.product],
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        debugger;
        console.log("FROM HANDLECLICK", data);
        // <Alert variant="info">Nicely Done! </Alert>
      });
  };

  mapList = () => {
    // console.log(this.props.user.lists)
    return this.props.userLists.map((list_obj) => (
      <Dropdown.Item
        key={list_obj.id}
        eventKey={list_obj.id}
        onClick={() => this.handleClick(list_obj)}
      >
        {list_obj.title}
      </Dropdown.Item>
    ));
  };

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
                  title="Lists"
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
                onClick={() => {this.props.handleTitle(this.state.title)}}
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
