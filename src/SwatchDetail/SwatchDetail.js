import React from 'react';
import EditSwatch from '../EditSwatch/EditSwatch'
import AddSwatch from '../AddSwatch/AddSwatch'
import Preview from '../Preview/Preview'
import ApiContext from '../ApiContext'
import { Link, Route, Switch} from 'react-router-dom'
import {findSwatch} from '../swatches-helpers.js'

export default class SwatchDetail extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static defaultProps = {
    history: {
      goBack: () => { }
    },
  }
  static contextType = ApiContext

  state = {
    error: null,
    activeFontFamily: 'Open Sans',
    color_primary: '#efefef',
    color_secondary: '#efefef' 
  }

  componentDidMount() {
    const { swatches=[] } = this.context
    const { swatchId } = this.props.match.params
    const swatch = findSwatch(swatches, parseInt(swatchId)) || {content: ''}
    this.setState({
      color_primary: swatch.color_primary,
      color_secondary: swatch.color_secondary,
      font_primary: swatch.font_primary
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
    console.log(swatch.font_primary)

    return(
      <section className='MainEditor'>
        <Link to='/' onClick={() => this.props.history.goBack()}> {`< Back`} </Link>
        <div className='container'>
          <div className='entry'>
            <Switch>
            <Route 
              exact
              path="/swatch/new" 
              render={(props) => 
                <AddSwatch 
                  onSelectPrimaryColor={this.handlePrimaryChange}
                  onSelectSecondaryColor={this.handleSecondaryChange}
                  history={this.props.history}
                  id={swatch.id}
                  name={swatch.name}
                  color_primary={swatch.color_primary}
                  color_secondary={swatch.color_secondary}
                  activeFontFamily={swatch.font_primary} 
              />}
              
            />
            <Route
              path="/swatch/:swatchId"
              render={(props) => 
                <EditSwatch 
                  onSelectPrimaryColor={this.handlePrimaryChange}
                  onSelectSecondaryColor={this.handleSecondaryChange} 
                  history={this.props.history}
                  id={swatch.id}
                  name={swatch.name}
                  color_primary={swatch.color_primary}
                  color_secondary={swatch.color_secondary}
                  font_primary={swatch.font_primary}
                  value={swatch.value}
                />}
              
            />
          </Switch>
          
          </div>
          
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
