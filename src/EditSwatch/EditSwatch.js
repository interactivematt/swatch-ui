import React from 'react'
import Form from '../Form/Form'
import PropTypes from 'prop-types'
import ApiContext from '../ApiContext';
import FontPicker from 'font-picker-react';
import config from '../config'

export default class EditSwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFontFamily: "Work Sans",
    }
  }

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault()
    const newSwatch = {
      name: e.target['swatch-name'].value,
      color_primary: e.target['color-primary'].value,
      color_secondary: e.target['color-secondary'].value,
      font_primary: e.target['font-primary'].value,
      font_secondary: e.target['font-secondary'].value,
    }
    console.log(`Swatch submitted`)
  }

  render(){

    return(
      <Form onSubmit={this.handleSubmit}>
        <label htmlFor='swatch-name-input'>
          Name
          <input type='text' id='swatch-name-input' placeholder='Name your swatch' name='swatch-name'/>
        </label>
        <label>
          Primary color
          <input type='text' placeholder='000000' name='color-primary'/>
        </label>
        <label>
          Secondary color
          <input type='text' placeholder='000000' name='color-secondary'/>
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
        
        <input type="submit" value="Submit" />
        <input type="submit" value="Save Swatch" />
      </Form>
    )
  }
}