import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import Nav from './Nav/Nav'
import './App.css'

class App extends Component {
  
  renderPages(){
    return(
      <>
        <Route 
          path="/" 
          component={HomePage} 
        >
        </Route>
        <Route
          path='/login'
          component={Login}
        />
        <Route
          path='/signup'
          component={SignUp}
        />
      </>
    )
  }



  render(){
    return(
      <>
        <Nav></Nav>
        <header><h1>swatch ui</h1></header>
        {this.renderPages()}
      </>
    )
  }
}

export default App;