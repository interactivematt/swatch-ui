import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import SwatchDetail from './SwatchDetail/SwatchDetail'
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import ApiContext from './ApiContext'
import config from './config'
import './App.css'

class App extends Component {
  state = {
    swatches: [],
    error: null,
  }

  setSwatches = ([ swatches ]) => {
    this.setState({
      swatches,
      error: null,
    })
  }

  addSwatch = swatch => {
    this.setState({
      swatches: [
        ...this.state.swatches,
        swatch
      ]
    })
  };

  updateSwatch = updatedSwatch => {
    this.setState({
      swatches: this.state.swatches.map(swatch =>
        (swatch.id !== updatedSwatch.id) ? swatch : updatedSwatch
      )
    })
  }

  deleteSwatch = swatchId => {
    const newSwatches = this.state.swatches.filter(swatch => swatch.id !== swatchId)
    this.setState({
      swatches: newSwatches
    })
    console.log(swatchId)
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/swatches`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${config.API_KEY}`
        }
      }),
    ])
      .then(([swatchesRes]) => {
        if(!swatchesRes.ok) {
          return swatchesRes.json().then(e => Promise.reject(e))
        }
        return Promise.all([
          swatchesRes.json(),
        ])
      })
      .then(this.setSwatches)
      .catch(error => {
        console.error({ error })
        this.setState({ error })
      })
    
  };


  renderPages(){
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
    console.log(this.state)
    const value = {
      swatches: this.state.swatches,
      addSwatch: this.addSwatch,
      updateSwatch: this.updateSwatch,
      deleteSwatch: this.deleteSwatch,
    }
    return(
      <ApiContext.Provider value={value}>
        <header>
          <h2><a href='/'>swatch ui</a></h2>
          <h4>Rapidly experiment with styling to generate quick swatches of your UI's look-and-feel.</h4>
        </header>
        {this.renderPages()}
      </ApiContext.Provider>
    )
  }
}

export default App;