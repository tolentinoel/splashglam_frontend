import React, { Component } from 'react';


class ProductList extends Component {

    // state = {
    //     products: ""
    // }

    // findProduct = () => {
    //     let p = this.state.products.filter(product => product.id === parseInt(this.props.productId))
    //     console.log(p)
    // }

    // getAllProducts = () => {
    //     return fetch('http://localhost:3000/products')
    //     .then(resp => resp.json())
    //     .then(data => this.setState({products: data}))
    // }


    render() {
        return (
            <div>
                <h1>All Products</h1>
                {/* <div>{this.props.productId ? this.findProduct() : this.getAllProducts()}</div> */}
            </div>
        );
    }
}

export default ProductList;
