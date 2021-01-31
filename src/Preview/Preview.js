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

    console.log(this.props.color_primary)
    console.log(this.props.color_secondary)

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
        <h2 className="header">This is a header</h2>
        <p className="title">This is a very long paragraph with text and stuff.</p>
        <div style={primaryColorStyle} className="color large"></div>
        <div style={secondaryColorStyle} className="color"></div>   
      </div>

  )}
}