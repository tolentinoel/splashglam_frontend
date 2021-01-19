import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/button';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert'

class ModalForm extends Component {

    state={
        title: '',
        newList: null,
        userLists: this.props.user.lists
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
            // debugger
            fetch("http://localhost:3000/lists",{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json'
                },
                body: JSON.stringify({
                    title: listObject.title,
                    user_id: user
                })
            })
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    newList: data
                }, () => {

                    fetch("http://localhost:3000/list_products",{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json'
                },
                body: JSON.stringify({
                    product_id: productId,
                    list_id: this.state.newList.id
                })
            })
            .then(resp => resp.json())
            .then(data =>{
                debugger
                console.log("HELLOOOO", data)
            })
                })

            })
    }

    handleClick = (list) => {

        fetch(`http://localhost:3000/lists/${list.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify({
                products: [...list.products,this.props.product],
            })
        })
        .then(resp => resp.json())
        .then(data => {
            debugger
            console.log(data)
            // <Alert variant="info">Nicely Done! </Alert>
        })
    }

    mapList = () => {
        console.log(this.props.user.lists)
       return this.props.user.lists.map(list_obj => <Dropdown.Item key={list_obj.id} eventKey={list_obj.id} onClick={() => this.handleClick(list_obj)}>{list_obj.title}</Dropdown.Item>)
    }

    render() {
        console.log("BAAAAAAA", this.state)
        const {closeModal, isOpen} = this.props

        return (

                <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
                    {console.log(this.props.user.lists)}

                    <>
                        <Modal show={isOpen} onHide={closeModal} backdrop="static">
                            <Modal.Header closeButton>
                                <Modal.Title>Give your list a title</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <Form.Group >
                                <Form.Label htmlFor="title">Title: </Form.Label>
                                    <Form.Control type="text" name="list_name" onChange={this.handleChange} value={this.state.title} placeholder="List Title"/>

                                    <Form.Label htmlFor="dropdown">Or Pick from your current lists:</Form.Label>
                                        <DropdownButton key="dropdown" variant="outline-info" title="Lists" id="bg-vertical-dropdown-1">
                                        {this.props.user.lists.length !== 0 ?
                                            this.mapList() : <Dropdown.Item key="no_list" eventKey="1">No list available</Dropdown.Item>
                                        }
                                        </DropdownButton>

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
