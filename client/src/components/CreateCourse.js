import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorsDisplay from './ErrorsDisplay';

const CreateCourse = ({ context }) => {
  // check to see if user is authenticated
  const currentUser = context.authenticatedUser || '';
  // setup the courses details states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  // setup the errors state
  const [errors, setErrors] = useState([]);
  // instantiate a history object
  let history = useHistory();
  // Assign states to course object
  const course = {
    title,
    description,
    estimatedTime,
    materialsNeeded
  };

  // Handles the form submit event
  const handleSubmit = (e) => {
    e.preventDefault();
  // Calls the data createCourse action
    context.data.createCourse(course, context.currentUsername, context.currentUserPass)
    .then( errors => {
      if (errors.length) {
        // set the errors state to pass to the ErrorsDisplay component
        setErrors(errors);
      } else {
        history.push('/');
      }
    })
    .catch((err) => {
      history.push('/error');
    });
  }

  // Handles form fields changes
  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  }
  const handleDescChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  }
  const handleEstimatedTimeChange = (event) => {
    const value = event.target.value;
    setEstimatedTime(value);
  }
  const handleMaterialsChange = (event) => {
    const value = event.target.value;
    setMaterialsNeeded(value);
  }
  // Handles cancel button logic
  const handleCancel = () => {
    history.push('/');
  }

  if (course) {
    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                    value={title} onChange={handleTitleChange} /></div>
                    {currentUser ? <p>By { currentUser.firstName } { currentUser.lastName }</p> : null}
                
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className="" placeholder="Course description..." value={description} onChange={handleDescChange} /></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" value={estimatedTime} onChange={handleEstimatedTimeChange} /></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed (1 per line)</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={materialsNeeded} onChange={handleMaterialsChange} /></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button></div>
          </form>
        </div>
      </div>
    )
  } else {
    return null;
  }

}

export default CreateCourse;