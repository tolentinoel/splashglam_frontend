import React from 'react';

class Product extends React.Component {

    render() {
        return (
            <div className="product">
                <h2>Product id: {this.props.productId}</h2>
                <h1>Product page</h1>
                <h2>Brand</h2>
                <h3>Description</h3>

            </div>
        );
    }
}

export default Product;
