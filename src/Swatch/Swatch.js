import React from 'react';
import ApiContext from '../ApiContext'
import { findSwatch } from '../swatches-helpers.js'
import { Link } from 'react-router-dom'

export default class Swatch extends React.Component {
  static defaultProps = {
    id: '',
    name: '',
    color_primary: '',
    color_secondary: '',
    font_primary: '',
    font_secondary: ''
  }

  static contextType = ApiContext
  
  render(){
    const { swatches=[] } = this.context
    const { id } = this.props
    const swatch = findSwatch(swatches, parseInt(id)) || {content: ''}
    return(
      <div className="Swatch">
        <Link to={`/swatch/${id}`}>
          {swatch.name}
        </Link>
      </div>
    )
  }
}