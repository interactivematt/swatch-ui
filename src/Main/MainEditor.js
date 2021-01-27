import React from 'react';
import Form from '../Form/Form'
import Frame from 'react-frame'

export default class MainEditor extends React.Component {
  render(){
    return(
      <section className='MainEditor'>
        <h2>Your swatch</h2>
        <div class='container'>
          <Form></Form>
          <Frame styleSheets={['frame1.css']} css={'body{background-color:#eee;}'}></Frame>
        </div>
      </section>
  )}
}