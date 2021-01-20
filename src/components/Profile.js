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
    fetch(`http://localhost:3000/lists`,{
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
                <Card style={{ width: "15rem" }} className="mini" >
                  <Link to={"/products/" + prd.id}>
                    <Card.Img variant="top" src={prd.image} alt=""/>
                  </Link>
                  <ListGroup className="list-group-flush mini" key={prd.id.toString()}>
                    <Card.Text className="prd_brand" >
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
              <h1 id="greeting">Hey {this.props.user.username}!</h1>
              <h5 id="greeting2">Skin Type: {this.props.user.skin_type}</h5>
              <h5 id="greeting3">Name: {this.props.user.name}</h5>
            </div>
          )
      }
  }

  render() {

    return (
      <>
      <div className="profile_sideNav">
          <ButtonGroup vertical className="btn_grp" >
            <Button key="button1" variant="outline-info" onClick={()=> this.updateProfile(this.props.user)}>
              Edit Profile
            </Button>

            <DropdownButton
              key="dropdown"
              variant="outline-info"
              as={ButtonGroup}
              title={this.state.dropDownTitle}
              id="bg-vertical-dropdown-1-profile"
            >
              {this.mapUserList()}
            </DropdownButton>

            <Button key="button3" variant="outline-info" href="/products" id="back_to_prd">
              Back to Products
            </Button>
            
          </ButtonGroup>
          <Button
              key="button4"
              variant="outline-danger"
              onClick={() => this.props.handleDelete()}
            >
              Delete Account
            </Button>
        </div>
      <div className="profile_div">

        {this.profileContent()}

      </div>
      </>
    );
  }
}

export default Profile;
