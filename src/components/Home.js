import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="home">
                <div className='home_jumbotron'>
                    <h1>SplashGlam</h1>
                    <h5>About</h5>
                    <p>SplashGlam is here to help you on your skincare journey.</p>
                    <p> This app is made as a resource for people who are curious or in need of better skincare products that they can add to their daily routine.</p>
                    <Link to='/products'>Click here for all products!</Link>
                </div>
            </div>
        );
    }
}

export default Home;
