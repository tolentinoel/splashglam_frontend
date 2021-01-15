import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNav from './components/TopNav';
import Home from './components/Home';
import FormRender from './components/FormRender';
import Product from './components/Product';
import Profile from './components/Profile';
import NotFound from './components/NotFound';

class App extends React.Component {
  dynamicProductPage = (r_props) => {
    console.log(r_props)
  }

  renderForm = (routerProps) => {
    switch (routerProps.location.pathname){
      case "/signup" :
        return <div className='form_div'><FormRender name="SignUp" /></div>

      case "/login" :
        return <div className='form_div'><FormRender name="Login" /></div>

      default : break
    }
  }
  render(){
    return (
      <div className="App">
          <TopNav />
          <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/login" exact component={this.renderForm}/>
          <Route path="/signup" exact component={this.renderForm}/>
          <Route path="/product" exact component={Product}/>
          <Route path="/product/:id" render={this.dynamicProductPage}/>
          <Route path="/profile" component={Profile}/>
          <Route component={NotFound}/>
          </Switch>
      </div>
    )
  }
}

export default App;
