import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';


class FormRender extends Component {

  state = {
    id: "",
    name: "",
    skin_type: "",
    username : "",
    password : ""
  }

  handleSubmit = (e) => {
    e.preventDefault()

    switch (true) {

        case (this.props.name === "Update" &&
        e.target.textContent === "Delete Account"):
            return this.props.handleDelete(this.state.id)

        case (this.props.name === "Login"):
            return this.props.handleSubmit(this.state)

        case (this.state.password === "" ||
        this.state.password_confirmation === ""):
            return alert("Fields cannot be blank.")

        case (this.props.name === "Update"
        && this.state.username === "" ):
            return alert("Fields cannot be blank.")

        case (this.props.name === "Signup" &&
        this.state.username === ""):
            return alert("Fields cannot be blank.")

        case (this.props.name === "Signup" &&
        this.state.name === ""):
            return alert("Fields cannot be blank.")

        case (this.props.name === "SignUp" &&
        this.state.password === ""):
        return alert("Fields cannot be blank.")

        default: {
          this.setState({
              password : ""
          })}

    }
}
    render() {
        return (
            <div>
              <h1>{this.props.name}</h1>
              {this.props.name === "SignUp" ?
                <Form.Group className="form_render">
                  <Form.Label htmlFor="name">Name</Form.Label>
                  <Form.Control type="text" name="name"/><br/>
                  <Form.Label htmlFor="skin_type">Skin Type</Form.Label>
                  <Form.Control type="text" name="skin_type"/>
                </Form.Group> : null}

                <Form.Group className="form_render">
                  <Form.Label htmlFor="username">Username</Form.Label>
                  <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                </Form.Group>

                <Form.Group className="form_render">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                </Form.Group>

                {this.props.name === "Update" ?
                  <Button id="update_btn" variant="outline-warning" type="submit" onClick={this.handleSubmit}>Update</Button> :
                  <Button variant="primary" type="submit" onClick={this.handleSubmit}>{this.props.name === "SignUp" ? "Sign up" : "Log in"}</Button> }

              {this.props.name === "SignUp" ?
              <h5>I have an account! <Link to="/login" >Log in!</Link></h5> : null }

              {this.props.name === "Login" ?
              <h5>Don't have an account? <Link to="/signup" >Sign up!</Link></h5> : null }

              {this.props.name === "Update" ?
              <Button id="delete_btn" variant="outline-danger" type="submit" onClick={this.handleSubmit}>Delete Account</Button> : null }

            </div>
          );

        }
      }
export default FormRender;
