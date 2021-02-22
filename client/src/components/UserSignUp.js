import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const UserSignUp = ({ signUp, signIn }) => {

  let history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const user = {
    firstName,
    lastName,
    emailAddress,
    password
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const pw = document.getElementById('password');
    const confirmPw = document.getElementById('confirmPassword');
    
    if (pw.value === confirmPw.value) {
      signUp(user)
      .then( errors => {
        if (errors.length) {
          setErrors( errors );
        } else {
          signIn(user.emailAddress, user.password)
          .then((user) => {
            if(user === null) {
              setErrors(['Sign-in was unsuccessful']);
            } else {
              // console.log(location);
              history.push("/");
            }
          })
          .catch((err) => {
            console.error(err);
          })
        }
      })
      .catch((err) => {
        console.log(err);
        // this.props.history.push('/error');
      });
    } else {
      setErrors(['Password does not match.']);
    }



  }

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

  const handleCancel = () => {
    history.push("/");
  }

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign Up</h1>
        <div>
          <ErrorsDisplay errors={errors}/>
          <form onSubmit={handleSubmit}>
            <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={handleFirstNameChange} value={firstName} /></div>
            <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={handleLastNameChange} value={lastName} /></div>
            <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={handleEmailChange} value={emailAddress} /></div>
            <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={handlePasswordChange} value={password} /></div>
            <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" defaultValue="" /></div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button></div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
      </div>
    </div>
  )

  function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;
  
    if (errors.length) {
      errorsDisplay = (
        <div>
          <h2 className="validation--errors--label">Validation errors</h2>
          <div className="validation-errors">
            <ul>
              {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
          </div>
        </div>
      );
    }
  
    return errorsDisplay;
  }
}

export default UserSignUp;