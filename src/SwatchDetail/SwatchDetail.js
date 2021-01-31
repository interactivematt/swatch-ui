import React from 'react';
import EditSwatch from '../EditSwatch/EditSwatch'
import Preview from '../Preview/Preview'
import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom'
import {findSwatch} from '../swatches-helpers.js'

export default class SwatchDetail extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  state = {
    error: null,
    activeFontFamily: '',
    color_primary: '',
    color_secondary: '' 
  }

  componentDidMount() {
    const { swatches=[] } = this.context
    const { swatchId } = this.props.match.params
    const swatch = findSwatch(swatches, parseInt(swatchId)) || {content: ''}
    this.setState({
      color_primary: swatch.color_primary,
      color_secondary: swatch.color_secondary,
      activeFontFamily: swatch.font_primary
    })
  }

  handlePrimaryChange = (color) => {
    this.setState({ color_primary: color.hex })
  };

  handleSecondaryChange = (color) => {
    this.setState({ color_secondary: color.hex })
  };

  render(){
   
    const { swatches=[] } = this.context
    const { swatchId } = this.props.match.params
    const swatch = findSwatch(swatches, parseInt(swatchId)) || {content: ''}
    return(
      <section className='MainEditor'>
        <Link to='/'>Back</Link>
        <h2>{swatch.name}</h2>
        <div className='container'>
          <EditSwatch
            id={swatch.id}
            name={swatch.name}
            color_primary={swatch.color_primary}
            color_secondary={swatch.color_secondary}
            onSelectPrimaryColor={this.handlePrimaryChange}
            onSelectSecondaryColor={this.handleSecondaryChange}
          />
          <Preview
            id={swatch.id}
            name={swatch.name}
            color_primary={this.state.color_primary}
            color_secondary={this.state.color_secondary}
          />
        </div>
      </section>
  )
  }
}
