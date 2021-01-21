import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/button";
import { Link } from "react-router-dom";
import ModalForm from "./ModalForm";
import "../css/ProductCard.css";

class ProductCard extends Component {
  state = {
    isOpen: false,
    modalForm: false,
    productId: null,
    product: null,
    newList: null,
    userLists: [],
  };

  updateUserLists = (data) => {
    this.setState({ userLists: data.lists });
  };

  renderModalForm = (p) =>
    this.setState({
      modalForm: true,
      product: p
    });

  openModal = (p, p_id) =>
    this.setState({
      isOpen: true,
      product: p,
      productId: p_id,
    });

  closeModal = () =>
    this.setState({
      isOpen: false,
      modalForm: false,
    });

  createList = (product, productId) => {
    // debugger
    this.setState(
      {
        product: product,
        productId: productId,
      },
      () => {
        this.openModal(this.state.product, this.state.productId);
        this.renderModalForm(this.state.product);
      }
    );
  };

  handleTitle = (listTitle) => {
    this.setState(
      (prevState) => {
        return {
          newList: { ...prevState.newList, title: listTitle },
        };
      },
      () => {
        this.postNewList();
        this.closeModal();
      }
    );
  };

  postNewList = () => {
    const listObject = this.state.newList;
    let user = this.props.user.id;
    let productId = this.state.productId;
    // debugger
    fetch("http://localhost:3000/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        title: listObject.title,
        user_id: user,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState(
          (prevState) => {
            return {
              userLists: [...prevState.userLists, data],
            };
          },
          () => {
            fetch("http://localhost:3000/list_products", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                product_id: productId,
                list_id: this.state.userLists[this.state.userLists.length - 1]
                  .id,
              }),
            })
              .then((resp) => resp.json())
              .then((data) => {
                // this.renderToast(data);
                console.log(data)
                alert('Successfully added to list!')
              });
          }
        );
      });
  };

  postToExistingList = (list_obj) => {
    this.closeModal();
    let productId = this.state.productId
    let listId = list_obj.id

    fetch("http://localhost:3000/list_products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        product_id: productId,
        list_id: listId
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        alert('Nice! Product added to list!')
      });
  };

  
 
  render() {
    let p_id = this.props.product.id;
    let product = this.props.product;
    return (
      <>
        <div className="p_card_div">
          <Card style={{ width: "18rem" }} className="p_card">
            <Link to={"/products/" + p_id}>
              <Card.Img variant="top" src={this.props.product.image_url} />
            </Link>
            <ListGroup className="list-group-flush">
              <Card.Text className="p_card_brand">
                {this.props.product.brand}
              </Card.Text>
            </ListGroup>
            <Card.Body className="list-group-flush">
              <Link to={"/products/" + p_id}>
                <h6 className="p_card_name">{this.props.product.name}</h6>
              </Link>
              <Button className="bookmark_btn" variant= "info" onClick={() => this.createList(product, p_id)}>
                Bookmark
              </Button>
            </Card.Body>
          </Card>

          {this.state.modalForm ? (
            <ModalForm
              closeModal={this.closeModal}
              isOpen={this.state.isOpen}
              user={this.props.user}
              productId={this.state.productId}
              product={this.state.product}
              userLists={this.state.userLists}
              handleTitle={this.handleTitle}
              updateUserLists={this.updateUserLists}
              postToExistingList={this.postToExistingList}
            />
          ) : null}
        </div>
      </>
    );
  }
}

export default ProductCard;
