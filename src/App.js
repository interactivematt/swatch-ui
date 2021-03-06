import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import SwatchDetail from './SwatchDetail/SwatchDetail'
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import ApiContext from './ApiContext'
import config from './config'
import GoogleFontLoader from 'react-google-font-loader';
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
      .then(([swatches]) => {
        this.setState({ swatches })
      })
      .catch(error => {
        console.error({ error })
        this.setState({ error })
      })
      
  };

  addSwatch = swatch => {
    this.setState({
      swatches: [
        ...this.state.swatches,
        swatch
      ]
    })
  };

  updateSwatch = newSwatch => {
    this.setState({
      swatches: this.state.swatches.map(swatch =>
        (swatch.id !== newSwatch.id) ? swatch : newSwatch
      )
    })
    console.log(`Swatch ${newSwatch.name} submitted`)
  }

  deleteSwatch = swatchId => {
    const newSwatches = this.state.swatches.filter(bm => bm.id !== swatchId)
    this.setState({
      swatches: newSwatches
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
      addSwatch: this.addSwatch,
      updateSwatch: this.updateSwatch,
      deleteSwatch: this.deleteSwatch,
    }
    
    const fonts = this.state.swatches.map(v => ({font: v.font_primary}));

    const uniqueFonts = Array.from(new Set(fonts.map(x => x.font)))
      .map(font_primary => {
        return{
          font: font_primary
        };
      });

    return(
      <ApiContext.Provider value={value}>
        <GoogleFontLoader
          fonts={uniqueFonts}
        />
        <header>
          <h2 className='logo'><a href='/'>swatch ui</a></h2>
          <h4>Rapidly experiment with styling to generate quick swatches of your UI's look-and-feel.</h4>
        </header>
        {this.renderPages()}
      </ApiContext.Provider>
    )
  }
}

export default App;