import React from 'react';
import Form from '../Form/Form'
import Preview from '../Preview/Preview'

export default class MainEditor extends React.Component {
  render(){
    return(
      <section className='MainEditor'>
        <h2>Your swatch</h2>
        <div className='container'>
          <Form></Form>
          <Preview></Preview>
        </div>
      </section>
  )}
}