

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
                    <h4><b>About</b></h4>
                    <p>SplashGlam is here to help you on your skincare journey. One of our goals is to inspire you in learning the way to healthy skin which is to learn what works for you and pick up positive skin habits along the way. We believe skincare is a personal journey that should evolve with you even with different life stages, styles, environments and experiences. We're here to  show you what other people just like yourself use as their holy grail of skincare.</p>
                    <p>This app is made as a resource for people who are curious or in need of better skincare products that they can add to their daily routine.</p>
                    <h5>Click <Link to='/login'>here</Link> to get started!</h5>
                </div>



                }
            </div>

        );
    }
}

export default Home;


