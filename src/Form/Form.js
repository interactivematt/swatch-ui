import React from 'react';

export default class Form extends React.Component {
  render(){
    return(
      <form className='Form' class='editor'>
        <label>
          Primary color
          <input type='text' value={null} placeholder='000000'/>
        </label>
        <label>
          Secondary color
          <input type='text' value={null} placeholder='000000' />
        </label>
        <label>
          Primary font
          <select value={null}>
            <option value='Default'>Default</option>
            <option value='Helvetica'>Helvetica</option>
            <option value='Georgia'>Georgia</option>
          </select>
        </label>
        <label>
          Secondary font (optional)
          <select value={null}>
            <option value='Default'>Default</option>
            <option value='Helvetica'>Helvetica</option>
            <option value='Georgia'>Georgia</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}