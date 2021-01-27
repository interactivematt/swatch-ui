import React from 'react';

export default class SignUp extends React.Component {
  render(){
    return(
      <div className='SignUp'>
        <h2>Sign up</h2>
        <p>Already registered? <a href='/login'>Log in here</a></p>
        <form>
          <label>
            Email
            <input type='email'/>
          </label>
          <label>
            Password
            <input type='password' placeholder=''/>
          </label>
          <input type='submit' value='Submit'></input>
        </form>
      </div>
    )
  }
}