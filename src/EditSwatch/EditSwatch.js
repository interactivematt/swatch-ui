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
  static defaultProps = {
    history: {
      push: () => { }
    },
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

  handleChangeName = e => {
    this.setState({ name: e.target.value })
  };

  handleSubmit = e => {
    e.preventDefault()
    const swatchId = this.props.id
    const { id, name, color_primary, color_secondary, font_primary } = this.state
    const newSwatch = { id, name, color_primary, color_secondary, font_primary }

    fetch(`${config.API_ENDPOINT}/swatches/${swatchId}`, {
      method: 'PATCH',
      body: JSON.stringify(newSwatch),
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${config.API_KEY}`
      },
    })
    .then(res => {
      if (!res.ok)
        return res.json().then(error => Promise.reject(error))
    })
    .then(newSwatch => {
      this.context.onUpdateSwatch(newSwatch)
      this.props.history.push('/')
    })
    .catch(error => {
      console.error(error)
      this.setState({ error })
    })
    console.log(`Swatch ${newSwatch.name} submitted`)
  }


  handleClickDelete = () => {
    const swatchId = this.props.id
    fetch(`${config.API_ENDPOINT}/swatches/${swatchId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteSwatch(swatchId)
        // allow parent to perform extra behaviour
        this.props.history.push(`/`)
      })
      .catch(error => {
        console.error({ error })
      })
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
    const styles = {
      fontStyle: { fontFamily: `${this.props.font_primary}`}
    }

    const { fontStyle } = styles

    return(
      <Form onSubmit={this.handleSubmit}>
        <h3 style={fontStyle}>{this.props.name}</h3>
        <label htmlFor='swatch-name-input'>
          Name
          <input 
            type='text' 
            id='swatch-name-input' 
            placeholder='Name your swatch' 
            name='swatch-name'
            defaultValue={this.props.name}
            onChange={this.handleChangeName}
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
            activeFontFamily={this.props.font_primary}
            onChange={(nextFont) =>
              this.setState({
                activeFontFamily: nextFont.family,
              })
            }
          />
        </label>
        
        <input type="submit" value="Save Swatch" />
        <button
          onClick={() => {
            this.handleClickDelete(
              this.props.id
            )
          }}
          type='button'
          className='delete'
        >
          Delete
        </button>
      </Form>
    )

  }
}