import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import '../css/NotFound.css';

class NotFound extends Component {
    render() {
        return (
            <div key="notFound" className="notFound_div">
                <h1 className="404_text">Oops! 404 Not found</h1>
                <Button id="btn_notfound" variant="outline-primary" href='/products'>Back to Home</Button>
            </div>
        );
    }
}

export default NotFound;
