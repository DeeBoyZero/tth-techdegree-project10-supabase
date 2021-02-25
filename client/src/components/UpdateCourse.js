import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import ErrorsDisplay from './ErrorsDisplay';
import useIsMounted from './helpers/IsMounted';

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

  const getCourseDetail = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${id}`);
      if (response.status === 200 || response.status === 304) {
        return response.json().then(data => data);
      }
      else if (response.status === 404) {
        return 404;
      }
      else if (response.status === 500) {
        return 500;
      }
    } catch (error) {
      history.push('/error');
    }
  }

  const courseUpdated = {
    id,
    title,
    description,
    estimatedTime,
    materialsNeeded
  }

  useEffect(() => {
    (async() => {
      const courseData = await getCourseDetail();
      if(isMounted.current) {
        setCourse(courseData);
        if (courseData && courseData.title) {
          setTitle(courseData.title);
          setDescription(courseData.description);
          setEstimatedTime(courseData.estimatedTime);
          setMaterialsNeeded(courseData.materialsNeeded);
        }
      }
    })()
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

  if (course === 404) {
    return <Redirect to="/notfound" />;
  } else if (course === 500) {
    return <Redirect to="/error" />;
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
                          <h4>Materials Needed (1 per line)</h4>
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