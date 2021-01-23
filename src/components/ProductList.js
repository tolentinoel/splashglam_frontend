import React, { Component } from "react";
import ProductCard from "./ProductCard";
// import Nav from "react-bootstrap/Nav";
import Tabs from "react-bootstrap/Tabs";
import Tab from 'react-bootstrap/Tab'
import "../css/ProductList.css";

class ProductList extends Component {
  state = {
    products: [],
    oilyProducts: [],
    normalProducts: [],
    dryProducts: [],
    key: "all"
  };


  componentDidMount() {
    fetch("http://localhost:3000/products")
      .then((resp) => resp.json())
      .then((data) => {
          let dry = data.filter(prd => prd.tag.includes("dry"))
          let oily = data.filter(prd => prd.tag.includes("oily"))
          let normCombi = data.filter(prd => prd.tag.includes("normal"))
          this.setState({
              products: data,
              oilyProducts: oily,
              normalProducts: normCombi,
              dryProducts: dry
            });
      });
  }

  mapProductData = (key) => {
      
    switch (this.state.key){
        case "all":
            return(
                this.state.products.map(product => {
                    return <ProductCard
                        key={product.id}
                        product={product}
                        createList={this.props.createList}
                        user={this.props.user}
                    />
                })
            )
        case "norm_combi":
            return(
                this.state.normalProducts.map(product => {
                    return <ProductCard
                        key={product.id}
                        product={product}
                        createList={this.props.createList}
                        user={this.props.user}
                    />
                })
            )
        case "oily":
            return(
                this.state.oilyProducts.map(product => {
                    return <ProductCard
                        key={product.id}
                        product={product}
                        createList={this.props.createList}
                        user={this.props.user}
                    />
                })
            )
        case "dry":
            return(
                this.state.dryProducts.map(product => {
                    return <ProductCard
                        key={product.id}
                        product={product}
                        createList={this.props.createList}
                        user={this.props.user}
                    />
                })
            )
        default:
            return (
                this.state.products.map(product => {
                    return <ProductCard
                        key={product.id}
                        product={product}
                        createList={this.props.createList}
                        user={this.props.user}
                    />
                })
            )
    }
  }

  render() {
    return (
      <div className="product_list">
        <Tabs
          id="controlled-tab"
          activeKey={this.state.key}
          onSelect={(k) => this.setState({key : k})}
        >
          <Tab eventKey="all" title="All">
            <h1>All Products</h1>
            {this.mapProductData(this.state.key)}
          </Tab>
          <Tab eventKey="norm_combi" title="Normal/Combination">
            <h1>For Normal/Combination skin</h1>
            {this.mapProductData(this.state.key)}
          </Tab>
          <Tab eventKey="oily" title="Oily">
            <h1>For Oily skin</h1>
            {this.mapProductData(this.state.key)}
          </Tab>
          <Tab eventKey="dry" title="Dry">
            <h1>For Dry skin</h1>
            {this.mapProductData(this.state.key)}
          </Tab>
        </Tabs>

        {/* DO CONDITIONAL RENDERING ON h1, MIGHT NEED TO CONTROL IT USING STATE */}

  
        
      </div>
    );
  }
}

export default ProductList;
