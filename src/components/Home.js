

import {Link} from 'react-router-dom';
import React, { Component } from 'react';
import '../css/Home.css';

class Home extends Component {

    state= {
        user:""
    }


    render() {
        return (
            <div className="home">
                {this.props.user ?

                <div className='home_jumbotron'>
                    <h1 className="about_header">YOU'RE LOGGED IN!</h1>
                    <h5>Click <Link to='/products'>here</Link> to see all products!</h5>
                </div>
                :
                <div className='home_jumbotron'>
                    <h1 className="about_header">Welcome to SplashGlam!</h1>
                    <h5>About</h5>
                    <p>SplashGlam is here to help you on your skincare journey.</p>
                    <p>This app is made as a resource for people who are curious or in need of better skincare products that they can add to their daily routine.</p>
                    <h6>Click <Link to='/login'>here</Link> to get started!</h6>
                </div>



                }
            </div>

        );
    }
}

export default Home;


