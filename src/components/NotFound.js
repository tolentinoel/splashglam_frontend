import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import '../css/NotFound.css';

class NotFound extends Component {
    render() {
        return (
            <div>
                <h1 className="404_text">Oops! 404 Not found</h1>
                <Button variant="outline-primary" href='/products'>Back to Products</Button>
            </div>
        );
    }
}

export default NotFound;
