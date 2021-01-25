import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import '../css/Product.css';


class Product extends React.Component {

    state ={
        product: "",
        reviewContent: "",
        id: this.props.productId,
        productReviews: [],
        darkProduct: this.props.darkMode
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
            // debugger
            this.setState({
               product: data,
               productReviews: data.reviews
            })
        })
      }

      obtainReview = (e) => {
        //   debugger
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



    render() {
        return (
            <div className={this.props.darkMode ? "darkProduct" : "product"}>
                    <Button className ="back_to_prd" variant="info" href='/products'>Back to Products</Button>
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
            </div>
        );
    }
}

export default Product;
