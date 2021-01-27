import React from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends React.Component {
  render(){
    return(
      <nav className='Nav' role="navigation">
        <Link to='/'>Home</Link>
        <Link to='/signup'>Sign Up</Link>
        <Link to='/login'>Login</Link>
      </nav>
    )  
  }
}