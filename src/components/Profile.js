import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import FormRender from "./FormRender";
import "../css/Profile.css";

class Profile extends Component {

  state ={
    update: false,
    viewLists: false,
    dropDownTitle: "Your Lists",
    listCollection: null,
    selectedList: null
  }

  componentDidMount() {
    fetch(`https://splashglam-api.herokuapp.com/lists`,{
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => res.json())
    .then(data => {
        this.setState({
            listCollection: data
        })
    })
  }

  handleListDelete = (id) => {

    fetch(`https://splashglam-api.herokuapp.com/lists/${id}`, {
      method:  "DELETE",
      headers: {"Content-Type": "application/json"},
    })
    .then(res => res.json())
    .then(() => {
      alert("List deleted.")
      window.location.reload()
    })
    
  }

  mapUserList = () => {
    if (this.props.user) {
      return this.props.user.lists.length !== 0 ? (
        this.props.user.lists.map((list_obj) => (
          <Dropdown.Item
            key={list_obj.id}
            eventKey={list_obj.id}
            onClick={()=> this.changeDropValue(list_obj)}
            className="dropdown-item"
            >
            {list_obj.title}
          </Dropdown.Item>
        ))
      ) : (
        <Dropdown.Item key="1" eventKey="1">
          No available list
        </Dropdown.Item>
      );
    }
  };

  updateProfile = () => {
    this.setState({
      update: true,
      viewLists: false
    })
    this.profileContent()
  }

  changeDropValue= (list_obj) => {
    // debugger
    this.setState({
      dropDownTitle: list_obj.title,
      viewLists: true,
      update: false,
      selectedList: list_obj.id,

    })
    this.profileContent()
  }

  filteredList = () => {

    let selected = this.state.listCollection.filter(list_obj => {
      return list_obj.id === this.state.selectedList
    })
    return (
      <div className= 'mini_card_div'>
          <h3>{selected[0].title}</h3>
          <div className="miniCard">
            {selected[0].products.map(prd => (
                <Card style={{ width: "14rem" }} className="mini" key={prd.id.toString()}>
                  <Link to={"/products/" + prd.id}>
                    <Card.Img variant="top" src={prd.image} alt=""/>
                  </Link>
                  <ListGroup className="list-group-flush mini" key={prd.id.toString()}>
                    <Card.Text className="prd_brand" key={prd.id}>
                    {prd.brand}
                    </Card.Text>
                  </ListGroup>
                  <Card.Body className="list-group-flush mini">
                    <Link to={"/products/" + prd.id}>
                      <h6 className="prd_name">{prd.name}</h6>
                    </Link>
                  </Card.Body>
                </Card>
            ))
          }
          </div>
          <Button
              id= "delete_list"
              key="delete_list"
              variant="outline-warning"
              onClick={() => this.handleListDelete(this.state.selectedList)}
            >
              Delete List
          </Button>
      </div>
    )
  }

  closeForm = () => {
    this.setState({update:false})
  }

  profileContent = () => {

    switch (true){
      case this.state.update:
        return(
          <div className="profile_content">
            <FormRender name={"Update"} currentUser={this.props.user} handleSubmit={this.props.handleSubmit} closeForm={this.closeForm}/>
          </div>
        )
      case this.state.viewLists:
        return(
          <div className="profile_content">
            {this.filteredList()}
          </div>
        )
        default:
          return (
            <div className="profile_content">
              <div id="user_profile">
                <img id="avatar" src="https://64.media.tumblr.com/84365fe19039b5fd917d6d449ca86290/tumblr_op4lb5DPRe1qg6rkio1_1280.jpg" alt="User's profile avatar"/>
                <div id="text_div">
                  <h1 id="greeting">Hello, {this.props.user.username}!</h1>
                  <h5 id="greeting2">Skin Type: {this.props.user.skin_type}</h5>
                  <h5 id="greeting3">Name: {this.props.user.name}</h5>
                  <h5 id="greeting4">Age: {this.props.user.age}</h5>
                </div>
              </div>
            </div>
          )
      }
  }

  render() {

    return (
      <div id="profile_main">
        <div className="profile_sideNav">
          <ButtonGroup vertical className="btn_grp" >
            <Button id="editProfile" key="button1" variant="outline-info" onClick={()=> this.updateProfile(this.props.user)}>
              <h5>Edit Profile</h5>
            </Button>

            <DropdownButton
              className = "drop_list"
              key="dropdown"
              variant="outline-info"
              as={ButtonGroup}
              title={this.state.dropDownTitle}
              id="bg-vertical-dropdown-1-profile"
            >
              {this.mapUserList()}
            </DropdownButton>

            <Button key="button3" variant="outline-info" href="/products" id="back_to_prd">
            <h5>Back to Products</h5>
            </Button>

          </ButtonGroup>
          <Button
              id="delete_accnt"
              key="button4"
              variant="outline-danger"
              onClick={() => this.props.handleDelete()}
            >
              Delete Account
          </Button>
        </div>


        {/* ------------------- PROFILE PAGE CONTENT --------------- */}
        <div className={this.props.darkMode ? "darkProfile_div" : "profile_div"}>

          {this.profileContent()}

        </div>
      </div>
    );
  }
}

export default Profile;
