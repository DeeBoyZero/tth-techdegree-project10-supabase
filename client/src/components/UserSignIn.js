import React, { useState } from 'react';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';

const UserSignIn = ({ context }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  let history = useHistory();
  let location = useLocation();

  const handleSubmit = (e) => {

    e.preventDefault();
    // console.log(context.actions.signIn(username, password))
    context.actions.signIn(username, password)
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

  const handleCancel = () => {
    history.push("/");
  }


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

export default UserSignIn;