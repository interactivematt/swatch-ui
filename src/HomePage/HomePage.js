import React from 'react';
import Library from '../Library/Library'
import ApiContext from '../ApiContext'

export default class HomePage extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render(){
    return(
      <>
        <main className='HomePage'>
          <Library/>
        </main>
      </>
    )
  }
}

