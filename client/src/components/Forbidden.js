import React from 'react'
import { Link } from 'react-router-dom';

const Forbidden = () => {
  return (
    <div className="bounds">
    <h1>Forbidden</h1>
    <p>Oh oh! You can't access this page.</p>
    <Link to='/'>Go back to home</Link>
  </div>
  )
}

export default Forbidden;