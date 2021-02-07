import React from 'react';
import Swatch from '../Swatch/Swatch'
import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom'

export default class Library extends React.Component {
  static defaultProps = {
    swatches: []
  }

  static contextType = ApiContext

  render(){
    const { swatches } = this.context
    return(
      <section className='Library'>
        <div className="swatchGrid">
          <Link to='/swatch/new' className={'swatchCard'}>
            <h2>+</h2>
            <h4>Create new swatch</h4>
          </Link>
          {swatches.reverse().map(swatch =>
            <Link to={`/swatch/${swatch.id}`} key={swatch.id} className={'swatchLink'}>
              <Swatch 
                id={swatch.id}
              />
            </Link>
          )}
        </div>
      </section>
    )
  }
}