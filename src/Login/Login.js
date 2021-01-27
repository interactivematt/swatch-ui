import React from 'react';

export default class Login extends React.Component {
  render(){
    return(
      <div className='Login'>
        <h2>Log in to your account</h2>
        <p>Need to sign up? <a href='/signup'>Click Here</a></p>
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