import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNav from './components/TopNav';
import FormRender from './components/FormRender';
import Home from './components/Home';
import ProductList from './components/ProductList';
import Product from './components/Product';
import Profile from './components/Profile';
import NotFound from './components/NotFound';

class App extends React.Component {

  state= {
    user: ""
  }

  renderProductPage = (r_props) => {
    console.log(r_props)
  // <div><Product productId={r_props.match.params.id} /></div>
  }

  renderHome = () => <Home name={this.state.user.name} />

  renderForm = (routerProps) => {
    switch (routerProps.location.pathname){
      case "/signup" :
        return <div className='form_div'><FormRender name="SignUp" /></div>

      case "/login" :
        return <div className='form_div'><FormRender name="Login" /></div>

      default : break
    }
  }

  renderAllProducts = () => {
    return <div><ProductList/></div>
  }

  render(){
    return (
      <div className="App">
          <TopNav />
          <Switch>
          <Route path="/" exact component={this.renderHome}/>
          <Route path="/login" exact component={this.renderForm}/>
          <Route path="/signup" exact component={this.renderForm}/>
          <Route path="/products" component={ProductList}/>
          <Route path="/products/:id" render={this.renderProductPage}/>
          <Route path="/profile" component={Profile}/>
          <Route component={NotFound}/>
          </Switch>
      </div>
    )
  }
}

export default App;
