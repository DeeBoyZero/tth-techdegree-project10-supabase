import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import ErrorsDisplay from './ErrorsDisplay';


function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => isMounted.current = false;
  }, []);

  return isMounted;
}


const UpdateCourse = ({context}) => {
  const isMounted = useIsMounted();

  let history = useHistory();
  const { id } = useParams();

  const [course, setCourse] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [errors, setErrors] = useState([]);

  const getCourseDetail = () => {
      return fetch(`http://localhost:5000/api/courses/${id}`)
        .then(res => res.json())
        .then( (courseData) => { if(isMounted.current) {
          setCourse(courseData);
          setTitle(courseData.title);
          setDescription(courseData.description);
          setEstimatedTime(courseData.estimatedTime);
          setMaterialsNeeded(courseData.materialsNeeded);
        }
        })
        .catch(err => {
          console.error(err);
        })
  }

  const courseUpdated = {
    id,
    title,
    description,
    estimatedTime,
    materialsNeeded
  }

  useEffect(() => {
    getCourseDetail();
  }, [])

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

  const handleSubmit = (e) => {
    e.preventDefault();

    context.data.updateCourse(courseUpdated, context.currentUsername, context.currentUserPass)
    .then( errors => {
      if (errors.length) {
        setErrors(errors)
      } else {
        history.push(`/courses/${courseUpdated.id}/detail`)  
      }
    })
      .catch((err) => {
        history.push('/error');
      });
  }

  const handleCancel = () => {
    history.push('/');
  }

  if (course) {
    if (course.userId) {
      if(course.userId === context.authenticatedUser.id) {
        return (
          <div className="bounds course--detail">
            <h1>Update Course</h1>
              <div>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                  <div className="grid-66">
                    <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                          value={title || ''} onChange={handleTitleChange} /></div>
                      {course.User ? <p>By {course.User.firstName} {course.User.lastName}</p> : <p></p>}
                    </div>
                    <div className="course--description">
                      <div><textarea id="description" name="description" className="" placeholder="Course description..." value={description || ''} onChange={handleDescChange} /></div>
                    </div>
                  </div>
                  <div className="grid-25 grid-right">
                    <div className="course--stats">
                      <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                          <h4>Estimated Time</h4>
                          <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                              placeholder="Hours" value={estimatedTime || ''} onChange={handleEstimatedTimeChange} /></div>
                        </li>
                        <li className="course--stats--list--item">
                          <h4>Materials Needed</h4>
                          <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={materialsNeeded || ''} onChange={handleMaterialsChange} /></div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button></div>
                </form>
              </div>
          </div>
        )
      } else {
        return <Redirect push to="/forbidden" />
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
}
export default UpdateCourse;