import React from 'react';
import Swatch from '../Swatch/Swatch'
import ApiContext from '../ApiContext'

export default class Library extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render(){
    const { swatches=[] } = this.context
    
    return(
      <section className='Library'>
        <h2>Library</h2>
        {swatches.map(swatch =>
          <li key={swatch.id}>
            <Swatch 
              id={swatch.id}
            />
          </li>
        )}
      </section>
    )
  }
}