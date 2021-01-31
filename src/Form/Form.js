import React from 'react';

<<<<<<< Updated upstream
export default class Form extends React.Component {
  render(){
    return(
      <form className='Form'>
        <label>
          Primary color
          <input type='text' placeholder='000000'/>
        </label>
        <label>
          Secondary color
          <input type='text' placeholder='000000'/>
        </label>
        <label>
          Primary font
          <select className='fontPrimary'>
            <option value='Default'>Default</option>
            <option value='Helvetica'>Helvetica</option>
            <option value='Georgia'>Georgia</option>
          </select>
        </label>
        <label>
          Secondary font (optional)
          <select className='fontSecondary'>
            <option value='Default'>Default</option>
            <option value='Helvetica'>Helvetica</option>
            <option value='Georgia'>Georgia</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
        <input type="submit" value="Save Swatch" />
      </form>
    )
  }
}
=======
export default function FrameForm(props) {
  const { className, ...otherProps } = props
  return (
    <form
      className={['form', className].join(' ')}
      action='#'
      {...otherProps}
    />
  )
}
>>>>>>> Stashed changes
