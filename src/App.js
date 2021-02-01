import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import SwatchDetail from './SwatchDetail/SwatchDetail'
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import ApiContext from './ApiContext'
import Nav from './Nav/Nav'
import config from './config'
import './App.css'

class App extends Component {
  state = {
    swatches: [],
    users: [],
    activeFontFamily: "Georgia",
  }

  setSwatches = (swatches) => {
    this.setState({
      swatches,
      error: null,
    })
  }

  componentDidMount() {

    Promise.all([
      fetch(`${config.API_ENDPOINT}/swatches`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${config.API_KEY}`
        }
      }),
    ])
      .then(([swatchesRes]) => {
        if(!swatchesRes.ok)
          return swatchesRes.json().then(e => Promise.reject(e))

        return Promise.all([
          swatchesRes.json(),
        ])
      })
      .then(([swatches]) => {
        this.setState({ swatches })
      })
      .catch(error => {
        console.error({ error })
      })
    
  }

  renderPages(){
    console.log(`${config.API_ENDPOINT}`)
    return(
      <>
        <Route 
          exact
          path="/" 
          component={HomePage} 
        />
        <Route
          path="/swatch/:swatchId"
          component={SwatchDetail}
        />
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
    const value = {
      swatches: this.state.swatches
    }
    return(
      <ApiContext.Provider value={value}>
        <Nav></Nav>
        <header><h1>swatch ui</h1></header>
        {this.renderPages()}
      </ApiContext.Provider>
    )
  }
}

export default App;