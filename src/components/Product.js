import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ModalForm from "./ModalForm";
import '../css/Product.css';


class Product extends React.Component {

    state ={
        product: "",
        reviewContent: "",
        id: this.props.productId,
        productReviews: [],
        isOpen: false,
        modalForm: false,
        newList: null,
        userLists: []
    }

    componentDidMount() {
        fetch(`http://localhost:3000/products/${this.state.id}`,{
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
          }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
               product: data,
               productReviews: data.reviews
            })
        })
      }

    obtainReview = (e) => {
        e.preventDefault()
            this.setState({
                reviewContent: e.target.value
            })
        }

    addReview = () => {
        let user = this.props.user
        let prd_id = parseInt(this.state.id)
        // debugger

        fetch('http://localhost:3000/reviews', {
          method:  "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
              user_id: user.id,
              product_id: prd_id,
              content: this.state.reviewContent
            })
        })
        .then(res => res.json())
        .then(data => {
           alert("Review added succesfully. Thank you!")
           this.setState({product: data})
        })

    }
// ----------MODAL FORM ON PRODCUCT PAGE ---------
    createList = (product, productId) => {
        this.setState({
            product: product,
            productId: productId
        }, () => {
                this.openModal(product, productId);
                this.renderModalForm(this.state.product)
            })
    }

    updateUserLists = (data) => {
        this.setState({ userLists: data.lists });
    }

    renderModalForm = (p) =>
        this.setState({
            modalForm: true,
            product: p
    })

    openModal = (p, p_id) =>
        this.setState({
            isOpen: true,
            product: p,
            id: p_id
    })

    closeModal = () =>
        this.setState({
        isOpen: false,
        modalForm: false
    })
// ------------ POST AND PATCH FOR LIST FROM MODAL FORM -------------
    handleTitle = (listTitle) => {
        this.setState(
          (prevState) => {
            return {
              newList: { ...prevState.newList, title: listTitle }
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
        let productId = this.state.id;
  
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
                    list_id: this.state.userLists[this.state.userLists.length - 1].id,
                  }),
                })
                  .then((resp) => resp.json())
                  .then((data) => {

                    console.log(data)
                    alert('Successfully added to list!')
                  })
              }
            )
          })
      }

      postToExistingList = (list_obj) => {
        this.closeModal();
        let productId = this.state.id
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
        return (
            <div className="product">
                    <Button className ="back_to_prd" variant="info" href='/products'><p id='bk_to_prd_txt'>Back to Products</p></Button>
                    <Button className="bookmark_onPage" onClick={() => this.createList(this.state.product, this.state.id)}><p id='bookmark_txt'>Bookmark</p></Button>
                <div className="product_section">
                    <img src={this.state.product.image_url} alt="skincare product" className="p_photo"/>

                    <div className = "info_div">
                        <h1 className="p_name">{this.state.product.name}</h1>
                        <h2 className="p_brand">{this.state.product.brand}</h2>
                        <p className="p_description">{this.state.product.description}</p>
                        <p className="p_price">Current Market Price: <b>{this.state.product.price}</b></p>
                        <Form className="text_area_div">
                        <Form.Group className="text_area">
                            <p>Share you thoughts with other users! </p>
                            <Form.Label htmlFor="review">Review this product</Form.Label>
                            <Form.Control as="textarea" value={this.state.reviewContent} onChange={this.obtainReview} rows={3} />
                        </Form.Group>
                        <Button className="review_btn" variant="warning" type="submit" onClick={this.addReview}>Submit</Button>
                    </Form>
                    </div>
                </div>
                
                <div className="review_div">
                    <h3 id="review_header">Product Reviews:</h3>

                    {this.state.productReviews.length !== 0 ?
                        this.state.productReviews.map(rvw =>
                        <div className="rvw">
                            <div id="content">
                                <p>{rvw.content}</p>
                            </div>
                            <div id="user_info">
                                <p>-- <b>{rvw.user}</b>, {rvw.user_age} |  Skin Type: {rvw.user_skin_type}</p>
                            </div>
                        </div>
                        ) :
                        <h5 className="no_reviews">No reviews on this product yet. Let us know your thoughts through the form above!</h5>}
                </div>

                {this.state.modalForm ? (
                    <ModalForm
                    closeModal={this.closeModal}
                    isOpen={this.state.isOpen}
                    user={this.props.user}
                    productId={this.state.id}
                    product={this.state.product}
                    userLists={this.props.user.lists}
                    handleTitle={this.handleTitle}
                    updateUserLists={this.updateUserLists}
                    postToExistingList={this.postToExistingList}
                    />
                ) : null}
            </div>
        );
    }
}

export default Product;
