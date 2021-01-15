import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import TopNav from './components/TopNav'


class App extends React.Component {
  render(){
    return (
      <div className="App">
          <TopNav />
      </div>
    )
  }
}

export default App;
