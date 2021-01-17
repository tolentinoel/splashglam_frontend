import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
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
    user: "",
    token: ""
  }

  // componentDidMount() {
  //   fetch('')
  // }

  renderProductPage = (r_props) => {
    // console.log(r_props)
  return <Product productId={r_props.match.params.id} addToList={this.addToList}/>
  }



  renderHome = () => <Home />

  renderForm = (routerProps) => {
    // console.log(routerProps)
    switch (routerProps.location.pathname){
      case "/signup" :
        return <FormRender name="SignUp" handleSubmit={this.handleSignup} history={this.props.history}/>

      case "/login" :
        return <FormRender name="Login" handleSubmit={this.handleLogin} history={this.props.history}/>

      case "/editprofile" :
        return <FormRender name="Update" handleSubmit={this.handleUpdate} />
        // handleDelete={this.openModal} history={this.props.history}
      default : break
    }
  }

  handleSignup = (info) => {
    // debugger
    // console.log(info)
    let data = {
      name: info.name,
      username: info.username,
      skin_type: info.skin_type,
      age: parseInt(info.age),
      password: info.password
    }
    this.handleAuth(data, "http://localhost:3000/users", "POST")

  }

  handleLogin = (info) => {
    let data = {
      username: info.username,
      password: info.password
    }
    this.handleAuth(data, "http://localhost:3000/login", "POST")
  }

  handleUpdate = (info) => {
    let data = {
      username: info.username,
      password: info.password
    }
    this.handleAuth(data, `http://localhost:3000/users/${info.id}`, "PATCH")
  }

  handleAuth = (data, resource, method) => {
    // debugger
    fetch(resource, {
      method:  method,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      debugger
      this.setState({user: data.user, token: data.token} ,() => {
        this.props.history.push('/products')
      })

      // if (data.error) {
      //   this.handleError(data) }
      // else {
      //   this.setState({user: data.user} ,() => {
      //     if (data.token){
      //       localStorage.setItem('jwt', data.token)
      //       this.props.history.push('/home')
      //     }  else  {
      //       alert("Profile Succesfully Updated!")
      //       this.props.history.push('/home')}
      // })}
    })
  }

  handleError = (data) => {
    alert(`${data.error}`)
    if (data.error === "That username is already been used. Please specify another username."){
      this.props.history.push("/editprofile")
    } else {
    this.props.history.push(
      data.error === "Invalid credentials, please try again." ? '/login' : '/signup')
    }
  }

  addToList = (product) => {
    fetch('http://localhost:8000/list', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.state.token}`
      },
      body: JSON.stringify({product_id: product.id})
    })
    .then(res => res.json())
    .then(console.log)
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

export default withRouter(App);
