import React from 'react';
import { Link } from 'react-router-dom'

export default class MainEmpty extends React.Component {
  render(){
    return(
      <section className='MainLibrary'>
        <h2>Get started</h2>
        <h4>Click to create a new swatch.</h4>
        <article>
          <Link to='./editor' className="create">Create New</Link>
        </article>
      </section>
    )
  }
}