import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class FormRender extends Component {

  state = {
    id: "",
    name: "",
    username : "",
    password : ""
  }
    render() {
        return (
            <div>
              <h1>{this.props.name}</h1>
              {this.props.name === "SignUp" ?

                <Form.Group >
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control type="text" name="name"/>
                </Form.Group> : null}

                <Form.Group >
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                </Form.Group>

                <Form.Group >
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                </Form.Group>

                {this.props.name === "Update" ?
                  <Button id="update_btn" variant="outline-warning" type="submit" >Update</Button> :
                  <Button variant="primary" type="submit" >{this.props.name === "SignUp" ? "Sign up" : "Log in"}</Button> }
                


            </div>
        );
    }
}

export default FormRender;
