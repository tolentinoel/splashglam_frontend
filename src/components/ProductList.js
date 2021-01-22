import React, { Component } from 'react';
import ProductCard from './ProductCard';
import Nav from 'react-bootstrap/Nav';
import "../css/ProductList.css";

class ProductList extends Component {

    state = {
        products: [],
        oilyProducts: [],
        normalProducts: [],
        dryProducts: [],

    }
// STATE FOR DIFFERENT PRODUCT TYPE, POLISH SCRAPED DATA AND RE_SEED DB
// AFTER SEEDING, DO A FETCH OF EACH TYPE ON COMPONENTDIDMOUNT

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
            <div className="product_list">
                <Nav justify variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link href="/products">All</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        {/* <Nav.Link href="/normal">Normal or Combination</Nav.Link> */}
                    </Nav.Item>
                    <Nav.Item>
                        {/* <Nav.Link href="/oily">Oily</Nav.Link> */}
                    </Nav.Item>
                    <Nav.Item>
                        {/* <Nav.Link href="/dry">Dry</Nav.Link> */}
                    </Nav.Item>
                </Nav>

                {/* DO CONDITIONAL RENDERING ON h1, MIGHT NEED TO CONTROL IT USING STATE */}

                <h1>All Products</h1>
                {this.state.products.map(product => <ProductCard key={product.id} product={product} createList={this.props.createList} user={this.props.user}/>)}

            </div>
        );
    }
}

export default ProductList;
