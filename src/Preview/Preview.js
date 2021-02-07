import React from 'react'
import ApiContext from '../ApiContext'

export default class Preview extends React.Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  state = {
    displayColorPicker: false
  }

  static contextType = ApiContext;
  
  render(){

    const styles = {
      primaryColorStyle: {
        backgroundColor: `${this.props.color_primary}`
      },
      secondaryColorStyle: {
        backgroundColor: `${this.props.color_secondary}`
      }
    }
    const { primaryColorStyle, secondaryColorStyle } = styles;

    return(
      <div className='apply-font ui'>
        <h6>H1</h6>
        <h1 className="header">Aa</h1>
        <h6>H3</h6>
        <h3>This is an article.</h3>
        <h6>Paragraph</h6>
        <p className="title">This is a very long paragraph with text and stuff.</p>
        <h6>Primary</h6>
        <div style={primaryColorStyle} className="color large"></div>
        <h6>Secondary</h6>
        <div style={secondaryColorStyle} className="color"></div>   
      </div>
  )}
}