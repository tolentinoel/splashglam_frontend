import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/button';
import Form from 'react-bootstrap/Form';
// import Alert from 'react-bootstrap/Alert'

class ModalForm extends Component {

    state={
        title: '',
        newList: null
    }

    handleChange = (e) => this.setState({title: e.target.value})

    handleTitle = (listTitle) => {
        this.setState(prevState =>{
          return{
            newList: {...prevState.newList, title: listTitle}
          }
        }, () => {
            this.postNewList()
            this.props.closeModal()
        })
    }


    postNewList = () => {

        const listObject = this.state.newList
        let user = this.props.user.id
        let productId = this.props.productId
            debugger
            fetch("http://localhost:3000/lists",{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json'
                },
                body: JSON.stringify({
                    product_id: productId,
                    title: listObject.title,
                    user_id: user
                })
            })
            .then(resp => resp.json())
            .then(data => {
                debugger
                console.log(data)
            // <Alert variant="info">
            // Done! {data.title} successfully made!
            // </Alert>
            })
    }

    render() {

        const {closeModal, isOpen} = this.props

        return (

                <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
                    <>
                        <Modal show={isOpen} onHide={closeModal} backdrop="static">
                            <Modal.Header closeButton>
                                <Modal.Title>Give your list a title</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group >
                                    <Form.Label htmlFor="username">Title: </Form.Label>
                                    <Form.Control type="text" name="list_name" onChange={this.handleChange} value={this.state.title} placeholder="List Title"/>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="outline-primary" type="submit" onClick={()=> this.handleTitle(this.state.title)}>
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
