

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
                <div className="chunky_footer">
                    <img id="product1" src="https://theklog.co/wp-content/uploads/2020/03/TIMY_PDP3_001_LowRes-updated.jpg" alt="product flatlay pic"/>
                    <img id="product2" src="https://cdn.shopify.com/s/files/1/0249/1218/products/11.23SokoGlamPDP-MedihealBeMineSet_HeroImage_860x.jpg?v=1606187814" alt="set of products on display"/>
                    <img id="product3" src="https://theklog.co/wp-content/uploads/2017/10/DSC09034_square-450x585.jpg" alt="bottles of skincare"/>
                </div>
            </div>

        );
    }
}

export default Home;


