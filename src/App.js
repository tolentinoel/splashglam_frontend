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

  renderProductPage = (r_props) => {
  return <Product productId={r_props.match.params.id}/>
  }


  renderHome = () => <Home loggedIn={!!this.state.user} user={this.state.user} token={localStorage.getItem('jwt')} refresh={this.handleRefresh}/>


  handleRefresh = (data) => {
    this.setState({user: data.user})
  }

  renderForm = (routerProps) => {
    // console.log(routerProps)
    switch (routerProps.location.pathname){
      case "/signup" :
        return <FormRender name="SignUp" handleSubmit={this.handleSignup} history={this.props.history}/>

      case "/login" :
        return <FormRender name="Login" handleSubmit={this.handleLogin} history={this.props.history}/>

      case "/editprofile" :
        return <FormRender name="Update" handleSubmit={this.handleUpdate} />
        // handleDelete={this.openModal} 
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
      // debugger
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

  handleError = (data) => {
    alert(`${data.error}`)
    if (data.error === "That username is already been used. Please specify another username."){
      this.props.history.push("/editprofile")
    } else {
    this.props.history.push(
      data.error === "Invalid credentials, please try again." ? '/login' : '/signup')
    }
  }

  newList = (event) => {
    debugger
    event.preventDefault()
    // let obj = {
    //   title: object.title,
    //   user_id: this.state.user.id
    // }
    // debugger
    // fetch('http://localhost:8000/list', {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${this.state.token}`
    //   },
    //   body: JSON.stringify(obj)
    // })
    // .then(res => res.json())
    // .then(console.log)
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({user: ""}, ()=>{
      this.props.history.push('/login')
    })
  }

  renderProfilePage = () => {
    this.props.history.push('/profile')
  
}


  render(){
    return (
      <div className="App">
        <TopNav loggedIn={!!this.state.user} handleLogout={this.handleLogout} renderProfilePage={this.renderProfilePage} createList={this.newList}/>

          <Switch>

            <Route exact path="/login" >
              {!!localStorage.getItem('jwt') ? <Redirect to="/" /> : <Route path="/login" exact component={this.renderForm}/>}
            </Route>

            <Route exact path="/signup" >
              {!!localStorage.getItem('jwt') ? <Redirect to="/" /> : <Route path="/signup" exact component={this.renderForm}/>}
            </Route>

            <Route exact path="/products" >
              {!!localStorage.getItem('jwt') ? <Route path="/products" exact component={ProductList}/> :  <Redirect to="/" /> }
            </Route>

            <Route exact path="/products/:id" >
              {!!localStorage.getItem('jwt') ? <Route exact path="/products/:id" render={this.renderProductPage} /> : <Redirect to="/" /> }
            </Route>

            <Route exact path="/">
              {this.renderHome()}
              {/* {!!localStorage.getItem('jwt') ? this.renderHome() : <Redirect to="/products" /> } */}
            </Route>

            <Route exact path="/profile" >
              {!!localStorage.getItem('jwt') ? <Route path="/profile" exact component={Profile}/> : <Redirect to="/login"/> }
            </Route>

            <Route component={NotFound}/>

          </Switch>
      </div>
    )
  }
}

export default withRouter(App);
