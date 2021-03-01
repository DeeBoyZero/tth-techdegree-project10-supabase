import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ErrorsDisplay from './ErrorsDisplay';

const UserSignUp = ({ context }) => {

  // instantiate a history object
  let history = useHistory();
  // Setup the user's states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  // Setup the errors state
  const [errors, setErrors] = useState([]);
  const [pwErrors, setPwErrors] = useState([]);

  // Associate the states to a User object
  const user = {
    firstName,
    lastName,
    emailAddress,
    password,
    passwordConfirm
  }

  // Handles the form submit event
  const handleSubmit = (e) => {
    
    e.preventDefault();

    // Calls the data createUser action
    context.data.createUser(user)
      .then(errors => {
        if (errors.length) {
          setErrors(errors);
        } else {
          // Calls the context signIn action
          context.actions.signIn(user.emailAddress, user.password)
          .then((user) => {
            if(user === null) {
              setErrors(['Sign-in was unsuccessful']);
            } else {
              history.push("/");
            }
          })
          .catch((err) => {
          history.push('/error');
          })
        }
      })
      .catch((err) => {
        history.push('/error');
      });
  }

  // Handles form fields changes
  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value)
  }
  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setLastName(value)
  }
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmailAddress(value)
  }
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value)
  }

  const handlePasswordConfirmChange = (event) => {
    const value = event.target.value;
    setPasswordConfirm(value);
  }

  // Handles cancel button logic
  const handleCancel = () => {
    history.push('/');
  }

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
              <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={handleFirstNameChange} value={firstName} /></div>
              <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={handleLastNameChange} value={lastName} /></div>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={handleEmailChange} value={emailAddress} /></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={handlePasswordChange} value={password} /></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" onChange={handlePasswordConfirmChange} value={passwordConfirm} /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
        </div>
      </div>
    )



}

export default UserSignUp;