import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
import '../css/ProductCard.css';

class ProductCard extends Component {

    render() {
        let p_id = this.props.product.id
        return (
            <Link to={'/products/'+ p_id} className='p_card_div'>

                <Card style={{ width: '20rem' }} className="p_card">
                    <Card.Img variant="top" src={this.props.product.image_url} />
                    <ListGroup className="list-group-flush">
                        <Card.Text className="p_card_brand">{this.props.product.brand}</Card.Text>
                    </ListGroup>
                    <Card.Body className="list-group-flush">
                        <h6 className="p_card_name">{this.props.product.name}</h6>
                        <img onClick={() => this.props.createList(p_id)} src="https://image.flaticon.com/icons/png/512/1443/1443708.png" width="40px" height="40px" alt="product_image"/>
                    </Card.Body>
                </Card>

            </Link>
        );
    }
}

export default ProductCard;

