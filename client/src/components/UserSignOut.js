import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// Calls the context signOut action and redirect to homepage
const UserSignOut = ({ context }) => {
  useEffect(() => {
    context.actions.signOut();
  }, []);
  
  return (
    <Redirect to="/" />
  );
}

export default UserSignOut;