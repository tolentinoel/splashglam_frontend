import React from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
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

  componentDidMount() {
    if(localStorage.getItem('jwt')){
      fetch('http://localhost:3000/getuser',{
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(res => res.json())
      .then(data => {
          this.setState({ user: data.user, token: data.token })
          this.handleRefresh(data)
      })
    }
  }

  renderHome = () => <Home loggedIn={!!this.state.user} user={this.state.user} token={localStorage.getItem('jwt')} refresh={this.handleRefresh}/>

  renderProductPage = (r_props) => {
  return <Product productId={r_props.match.params.id}/>
  }

  renderProductList = () => {
    return <ProductList createList={this.createList} user={this.state.user}/>
  }

  renderProfilePage = () => {
    return <Profile user={this.state.user} handleDelete={this.handleDelete}/>
  }

  renderForm = (routerProps) => {

    switch (routerProps.location.pathname){
      case "/signup" :
        return <FormRender name="SignUp" handleSubmit={this.handleSignup} history={this.props.history}/>

      case "/login" :
        return <FormRender name="Login" handleSubmit={this.handleLogin} history={this.props.history}/>

      default : break
    }
  }

  handleRefresh = (data) => {
    this.setState({user: data.user, token: data.token})
  }

  handleSignup = (info) => {
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

  handleDelete = () => {

    fetch(`http://localhost:3000/users/${this.state.user.id}`, {
      method:  "DELETE",
      headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(() => {
      alert("Account deleted.")
      this.handleLogout()
    })
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({user: ""}, ()=>{
      this.props.history.push('/login')
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

  handleAuth = (data, resource, method) => {
    fetch(resource, {
      method:  method,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      this.setState({user: data.user, token: data.token} ,() => {
        this.props.history.push('/products')
      })

      if (data.error) {
        this.handleError(data) }
      else {
        this.setState({user: data.user} ,() => {
          if (data.token){
            localStorage.setItem('jwt', data.token)
            this.props.history.push('/products')
          }  else  {
            alert("Profile Succesfully Updated!")
            this.props.history.push('/products')}
      })}
    })
  }


  render() {
    return (
      <div className="App">

        <TopNav loggedIn={!!this.state.user} handleLogout={this.handleLogout} renderProfilePage={this.renderProfilePage} createList={this.createList}/>

          <Switch>

            <Route exact path="/login" >
              {!!localStorage.getItem('jwt') ? <Redirect to="/" /> : <Route path="/login" exact component={this.renderForm}/>}
            </Route>

            <Route exact path="/signup" >
              {!!localStorage.getItem('jwt') ? <Redirect to="/" /> : <Route path="/signup" exact component={this.renderForm}/>}
            </Route>

            <Route exact path="/products" >
              {!!localStorage.getItem('jwt') ?   <Route path="/products" render={this.renderProductList}/> : <Redirect to="/" />  }
            </Route>

            <Route exact path="/products/:id" >
              {!!localStorage.getItem('jwt') ? <Route exact path="/products/:id" render={this.renderProductPage} /> : <Redirect to="/" /> }
            </Route>

            <Route exact path="/">

              {!!localStorage.getItem('jwt') ? <Redirect to="/login" /> :<Route path="/" render={this.renderHome}/> }
            </Route>

            <Route exact path="/profile" >
              {!!localStorage.getItem('jwt') ? <Route path="/profile" render={this.renderProfilePage}/> : <Redirect to="/login"/> }
            </Route>

            <Route component={NotFound}/>

          </Switch>

      </div>
    )
  }
}

export default withRouter(App);
