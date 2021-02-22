import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateCourse = ({ authenticatedUser }) => {

  const currentUser = authenticatedUser;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');

  let history = useHistory();

  const handleCancel = () => {
    history.push("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value)
  }
  const handleDescChange = (event) => {
    const value = event.target.value;
    setDescription(value)
  }
  const handleEstimatedTimeChange = (event) => {
    const value = event.target.value;
    setEstimatedTime(value)
  }
  const handleMaterialsChange = (event) => {
    const value = event.target.value;
    setMaterialsNeeded(value)
  }

  return (
    <div className="bounds course--detail">
    <h1>Create Course</h1>
      <div>
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
                  <h4>Materials Needed</h4>
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
}

export default CreateCourse;