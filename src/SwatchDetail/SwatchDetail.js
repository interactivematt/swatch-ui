import React from 'react';
import Form from '../Form/Form'
import Preview from '../Preview/Preview'
import ApiContext from '../ApiContext'
import {findSwatch} from '../swatches-helpers.js'

export default class Editor extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render(){
    const { swatches=[] } = this.context
    const { swatchId } = this.props.match.params
    const swatch = findSwatch(swatches, parseInt(swatchId)) || {content: ''}
    console.log(swatch)
    return(
      <section className='MainEditor'>
        <h2>{swatch.name}</h2>
        <div className='container'>
          <Form
            id={swatch.id}
            name={swatch.name}
            color_primary={swatch.color_primary}
            color_secondary={swatch.color_secondary}
          />
          <Preview></Preview>
        </div>
      </section>
  )}
}