import React from 'react';
import { Link } from 'react-router-dom'

export default class MainEmpty extends React.Component {
  render(){
    return(
      <section className='MainEmpty'>
        <h2>Create a swatch</h2>
        <h4>(Empty state)</h4>
        <h4>Click to create a new swatch.</h4>
        <article>
          <Link to='/editor'>Create New</Link>
        </article>
      </section>
    )
  }
}