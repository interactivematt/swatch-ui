import React from 'react';
import ApiContext from '../ApiContext'
import { findSwatch } from '../swatches-helpers.js'

export default class Swatch extends React.Component {
  constructor(props){
    super(props);
    this.state = {activeFontFamily: this.props.font_primary}
  }

  static contextType = ApiContext
  
  render(){
    const { swatches=[] } = this.context
    const { id } = this.props
    const swatch = findSwatch(swatches, parseInt(id)) || {content: ''}

    const styles = {
      primaryColorStyle: {
        backgroundColor: `${swatch.color_primary}`
      },
      secondaryColorStyle: {
        backgroundColor: `${swatch.color_secondary}`
      },
      fontStyle: {
        fontFamily: `${swatch.font_primary}`
      }
    }
    const { primaryColorStyle, secondaryColorStyle, fontStyle } = styles;
    return(
      <div style={fontStyle} className={"swatchCard apply-font"}>
        
        <h3>{swatch.name}</h3>
        <p style={fontStyle}>{swatch.font_primary}</p>
        <div style={primaryColorStyle} className="color large"></div>
        <div style={secondaryColorStyle} className="color"></div>
        <span><h6>View Swatch</h6></span>
      </div>
    )
  }
}