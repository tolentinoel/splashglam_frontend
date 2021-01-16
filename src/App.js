import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNav from './components/TopNav';
import FormRender from './components/FormRender';
import Home from './components/Home';
import ProductList from './components/ProductList';
import Profile from './components/Profile';
import Product from './components/Product';
import NotFound from './components/NotFound';

class App extends React.Component {

  state= {
    user: ""
  }

  renderProductPage = (r_props) => {
    console.log(r_props)
  return <Product productId={r_props.match.params.id} />
  }

  renderHome = () => <Home name={this.state.user.name} />

  renderForm = (routerProps) => {
    switch (routerProps.location.pathname){
      case "/signup" :
        return <div className='form_div'><FormRender name="SignUp" handleSubmit={this.handleSignup}/></div>

      case "/login" :
        return <div className='form_div'><FormRender name="Login" handleSubmit={this.handleLogin}/></div>

      case "/editprofile" :
        return <div className='login_screen'><FormRender name="Update" handleSubmit={this.handleUpdate} /></div>
        // handleDelete={this.openModal} history={this.props.history}
      default : break
    }
  }

  handleLogin = () =>{

  }

  handleSignup = () => {
    
  }

  // renderAllProducts = () => {
  //   return <div><ProductList/></div>
  // }

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
