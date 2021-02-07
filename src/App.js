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
    
  };

  handleAddSwatch = swatch => {
    this.setState({
      swatches: [
        ...this.state.swatches,
        swatch
      ]
    })
  };

  handleUpdateSwatch = swatch => {
    this.setState({
      swatches: this.state.swatches.map(sw =>
        (sw.id !== swatch.id) ? sw : swatch
      )
    })
  }

  handleDeleteSwatch = swatchId => {
    this.setState({
      swatches: this.state.swatches.filter(swatch => swatch.id !== swatchId)
    })
  }

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
    const value = {
      swatches: this.state.swatches,
      addSwatch: this.handleAddSwatch,
      updateSwatch: this.handleUpdateSwatch,
      deleteSwatch: this.handleDeleteSwatch,
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