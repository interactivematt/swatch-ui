import React from 'react';
import Frame from 'react-frame-component'

export default class Preview extends React.Component {
  render(){
    return(
    <Frame className='Preview'>
      <div className='ui'>
        <h2 className="header">This is a header</h2>
        <p className="title">This is a very long paragraph with text and stuff.</p>
        <button value="Click me">Click Me</button>        
      </div>
    </Frame>
  )}
}