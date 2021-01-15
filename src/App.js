import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNav from './components/TopNav';
import Home from './components/Home';
import FormRender from './components/FormRender';
import Product from './components/Product';
import Profile from './components/Profile';
import NotFound from './components/NotFound';

class App extends React.Component {
  render(){
    return (
      <div className="App">
          <TopNav />
          <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/products" component={Product}/>
          <Route path="/profile" component={Profile}/>
          <Route component={NotFound}/>
          </Switch>
      </div>
    )
  }
}

export default App;
