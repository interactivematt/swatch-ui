import React from 'react'
import Form from '../Form/Form'
import PropTypes from 'prop-types'
import ApiContext from '../ApiContext'
import FontPicker from 'font-picker-react'
import { SwatchesPicker } from 'react-color'
import config from '../config'

export default class EditSwatch extends React.Component {
  state = {
      displayColorPicker: false
  }

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    // history: PropTypes.shape({
    //  push: PropTypes.func,
    // }).isRequired,
  };

  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault()
    const newSwatch = {
      name: e.target['swatch-name'].value,
      color_primary: e.target['color-primary'].value,
      color_secondary: e.target['color-secondary'].value,
      font_primary: this.state.activeFontFamily,
    }
    console.log(`Swatch ${newSwatch.name} submitted`)
  }

  handlePrimaryColorInputOpen = () => {
    this.setState({ displayPrimaryColorPicker: !this.state.displayPrimaryColorPicker })
  };

  handlePrimaryColorInputClose = () => {
    this.setState({ displayPrimaryColorPicker: false })
  };

  handleSecondaryColorInputOpen = () => {
    this.setState({ displaySecondaryColorPicker: !this.state.displaySecondaryColorPicker })
  };

  handleSecondaryColorInputClose = () => {
    this.setState({ displaySecondaryColorPicker: false })
  };

  sendPrimaryData = (color) => {
    this.props.onSelectPrimaryColor(color)
    this.setState({ color_primary: color.hex })
  }

  sendSecondaryData = (color) => {
    this.props.onSelectSecondaryColor(color)
    this.setState({ color_secondary: color.hex })
  }

  render(){
    const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }

    return(
      <Form onSubmit={this.handleSubmit}>
        <label htmlFor='swatch-name-input'>
          Name
          <input 
            type='text' 
            id='swatch-name-input' 
            placeholder='Name your swatch' 
            name='swatch-name'
            defaultValue={this.props.name}
          />
        </label>
        <label>
          Primary color
          <input 
            type='text' 
            name='color-primary'
            onClick={ this.handlePrimaryColorInputOpen}
            defaultValue={this.props.color_primary}
            value={this.state.color_primary}
          />
          { this.state.displayPrimaryColorPicker ? <div style={ popover }>
            <div style={ cover } onClick={ this.handlePrimaryColorInputClose }/>
            <SwatchesPicker color={ this.state.color_primary } onChange={ this.sendPrimaryData } />
          </div> : null }
        </label>
        <label>
          Secondary color
          <input 
            type='text' 
            name='color-secondary'
            onClick={ this.handleSecondaryColorInputOpen}
            defaultValue={this.props.color_secondary}
            value={this.state.color_secondary}
          />
          { this.state.displaySecondaryColorPicker ? <div style={ popover }>
            <div style={ cover } onClick={ this.handleClose }/>
            <SwatchesPicker color={ this.state.color_secondary } onChange={ this.sendSecondaryData } />
          </div> : null }
        </label>
        <label>
          Primary font
          <FontPicker
            apiKey={config.GOOGLE_API_KEY}
            activeFontFamily={this.state.activeFontFamily}
            onChange={(nextFont) =>
              this.setState({
                activeFontFamily: nextFont.family,
              })
            }
          />
        </label>
        
        <input type="submit" value="Save Swatch" />
      </Form>
    )

  }
}