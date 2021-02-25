import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import ErrorsDisplay from './ErrorsDisplay';

const UserSignIn = ({ context }) => {
  
  // Setup the user states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Setup the error state 
  const [errors, setErrors] = useState([]);
  // instantiate a history object
  let history = useHistory();
  // instantiate a location object
  let location = useLocation();

  // Handles the form submit event
  const handleSubmit = (e) => {

    e.preventDefault();
    // Calls the data signIn action
    context.actions.signIn(username, password)
      .then((user) => {
        if(user === null) {
          setErrors(['Sign-in was unsuccessful']);
        } else {
          location.state ? history.push(location.state.from.pathname) : history.goBack();
        }
      })
      .catch((err) => {
        console.error(err);
      })
  }
  // Handles cancel button logic
  const handleCancel = () => {
    history.push("/");
  }
  // Handles form fields changes
  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value)
  }
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value)
  }

  return (
    <div className="bounds">
    <div className="grid-33 centered signin">
      <h1>Sign In</h1>
      <div>
        <ErrorsDisplay errors={errors}/>
        <form onSubmit={handleSubmit}>
          <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={handleUsernameChange} value={username}/></div>
          <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={handlePasswordChange} value={password}/></div>
          <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={handleCancel} >Cancel</button></div>
        </form>
      </div>
      <p>&nbsp;</p>
      <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
    </div>
  </div>
  )
}

export default UserSignIn;