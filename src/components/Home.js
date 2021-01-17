
import React from 'react';
import {Link} from 'react-router-dom';

const Home = (props) => {
    
    return (
        <div className="home">
                <div className='home_jumbotron'>
                    <h1 className="about_header">Welcome to SplashGlam {props.username}!</h1>
                    <h5>About</h5>
                    <p>SplashGlam is here to help you on your skincare journey.</p>
                    <p>This app is made as a resource for people who are curious or in need of better skincare products that they can add to their daily routine.</p>
                    <h6>Click <Link to='/signup'>here</Link> to get started!</h6>
                </div>

            </div>
    );
}

export default Home;

