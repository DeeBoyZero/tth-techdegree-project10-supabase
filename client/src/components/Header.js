import React from 'react';
import { Link } from 'react-router-dom';


const Header = ({context}) => {

  const authUser = context.authenticatedUser;

  return (

    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <nav>
          {authUser ? (
            <>
              <span>Welcome, {authUser.firstName}!</span>
              <Link to="/signout">Sign Out</Link>
            </>
          ) : (
            <>
              <Link className="signup" to="/signup">Sign Up</Link>
              <Link className="signin" to="/signin">Sign In</Link>
            </>
          )}
        </nav>
      </div>
      
    </div>
  )
}

export default Header;