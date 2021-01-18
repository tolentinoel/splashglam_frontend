import React, { Component } from 'react';
import ProductCard from './ProductCard';
import Nav from 'react-bootstrap/Nav';

class ProductList extends Component {

    state = {
        products: []
    }


    componentDidMount(){
       fetch('http://localhost:3000/products')
        .then(resp => resp.json())
        .then(data => {
            // debugger
            this.setState({products: data})
        })
    }


    render() {
        return (
            <div>
                <Nav justify variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link href="/products">All</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/normal">Normal or Combination</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/oily">Oily</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/dry">Dry</Nav.Link>
                    </Nav.Item>
                </Nav>
                <h1>All Products</h1>
                {this.state.products.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
        );
    }
}

export default ProductList;
