import Button from 'react-bootstrap/Button';
import React from 'react';
import '../css/Product.css';


class Product extends React.Component {

    render() {
        return (
            <div className="product">
                <h2>Product id: {this.props.productId}</h2>
                <h1>Product page</h1>
                <h2>Brand</h2>
                <h3>Description</h3>
                <Button variant="outline-primary" href='/products'>Back to Products</Button>
            </div>
        );
    }
}

export default Product;
