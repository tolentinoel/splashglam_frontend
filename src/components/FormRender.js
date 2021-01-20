import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import "../css/FormRender.css";

class FormRender extends Component {

  state = {
    id: "",
    name: "",
    skin_type: "",
    age: "",
    username : "",
    password : "",
    lists: []
  }


  handleSubmitforUpdate = (e) => {
    e.preventDefault()
    this.props.handleSubmit(this.state)
    this.props.closeForm()
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmit(this.state)
  }


  handleChange = (e) => {
    let {name, value} = e.target
    this.props.name === "Update" ?
    this.setState({
      [name]: value,
      id: this.props.currentUser.id,
      name: this.props.currentUser.name,
      skin_type: this.props.currentUser.skin_type,
      lists: this.props.currentUser.lists
    })
    :
    this.setState({
      [name]: value
    })
  }

    render() {
        return (
            <div className="login_signup">
              <Form >
                <h1>{this.props.name}</h1>
                {this.props.name === "SignUp" ?
                  <Form.Group className="form_render" >
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleChange}/><br/>
                    <Form.Label htmlFor="skin_type">Skin Type</Form.Label>
                    <Form.Control type="text" name="skin_type" value={this.state.skin_type} onChange={this.handleChange} placeholder="Oily, Normal, Combination or Dry?"/>
                    <Form.Label htmlFor="age" >Age</Form.Label>
                    <Form.Control type="number" name="age" value={this.state.age} min='1' max='100' onChange={this.handleChange}/>
                  </Form.Group> : null}

                  {this.props.name === "Login" || this.props.name === "SignUp" ?
                  <Form.Group className="form_render">
                  <Form.Label htmlFor="username">Username</Form.Label>
                  <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                </Form.Group>
                :
                  <Form.Group className="form_render">
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder={this.props.currentUser.username} />
                  </Form.Group>

                  }

                  <Form.Group className="form_render">
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                  </Form.Group>

                  {this.props.name === "Update" ?
                    <Form.Group className="form_render">
                      <Form.Label htmlFor="age" >Age</Form.Label>
                    <Form.Control type="number" name="age" value={this.state.age} min='1' max='100' onChange={this.handleChange} placeholder={this.props.currentUser.age}/>
                  </Form.Group> : null}

                  {this.props.name === "Update" ?
                    <Button id="update_btn" variant="outline-warning" type="submit" onClick={this.handleSubmitforUpdate}>Update</Button> :
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>{this.props.name === "SignUp" ? "Sign up" : "Log in"}</Button> }
              </Form>

              {this.props.name === "SignUp" ?
              <h5>I have an account! <Link to="/login" >Log in!</Link></h5> : null }

              {this.props.name === "Login" ?
              <h5>Don't have an account? <Link to="/signup" >Sign up!</Link></h5> : null }

              {/* {this.props.name === "Update" ?
              <Button id="delete_btn" variant="outline-danger" type="submit" onClick={this.handleSubmit}>Delete Account</Button> : null } */}

            </div>
          );

        }
      }
export default FormRender;
