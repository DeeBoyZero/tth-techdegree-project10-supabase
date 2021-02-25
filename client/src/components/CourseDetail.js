import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory, Redirect } from 'react-router-dom';
// Import React-Markdown to display markdown format in the description and materials sections
import ReactMarkdown from 'react-markdown';
// Import gfm plugin for react-markdown for strikethrough, tables and more ...
import gfm from 'remark-gfm';

// import IsMounted helper function
import useIsMounted from './helpers/IsMounted';

const CourseDetail = ({ context }) => {
  // get access to isMounted variable
  const isMounted = useIsMounted();
  // instantiate a history object
  let history = useHistory();
  // check to see if user is authenticated
  const currentUser = context.authenticatedUser || '';
  // get the id from the url param
  const { id } = useParams()
  // setup the course state
  const [course, setCourse] = useState([]);
  // Fetch data function
  const getCourseDetail = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${id}`);
      // If response is 200 or 304, the data is returned in json format
      if (response.status === 200 || response.status === 304) {
        return response.json().then(data => data);
      }
      // If 404 is received, set the course state to the status code
      else if (response.status === 404) {
        return 404;
      }
      // If 500 is received, set the course state to the status code
      else if (response.status === 500) {
        return 500;
      }
    } catch (error) {
      history.push('/error');
    }
  }

  const deleteCourse = async () => {
    try {
      // Calls the data deleteCourse action
      const response = await context.data.deleteCourse(id, context.currentUsername, context.currentUserPass);
      if (response.length) {
        history.push('/error');
      } else {
        history.push('/');
      }
    } catch (error) {
      history.push('/error');
    } 
  }

  useEffect(() => {
    (async () => {
      const myCourse = await getCourseDetail();
      // Check to see if component is mounted before trying to update the state
      if(isMounted.current) {
        setCourse(myCourse);
      }
    })()
  }, []);

  if (course) {
    // Redirects to notfound route if 404 received
    if (course === 404) {
      return <Redirect to="/notfound" />
      // Redirects to error route if 500 received
    } else if (course === 500) {
      return <Redirect to="/error" /> 
    } else {
      return (
        <div>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">{currentUser.id === course.userId ? <span><Link className="button" to={`/courses/${id}/update`}>Update Course</Link><Link className="button" onClick={deleteCourse} to="#">Delete Course</Link></span> : null }<Link
                    className="button button-secondary" to="/">Return to List</Link></div>
              </div>
            </div>
            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
                  {course.User ? <p>By {course.User.firstName} {course.User.lastName}</p> : <p></p>}
                </div>
                <div className="course--description">
                  {course.description ? <ReactMarkdown plugins={[gfm]} source={course.description} /> : null}
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      {course.estimatedTime ? <h3>{course.estimatedTime}</h3> : null}                 
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      {course.materialsNeeded ? 
                        <ul>
                          {course.materialsNeeded.split(/\n/).map((item,index) => {
                            return <li key={index}><ReactMarkdown plugins={[gfm]} source={item} /></li>
                          })}
                        </ul>
                        :
                        null
                      }
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      )
    }
  } else {
    return null;
  }
}

export default CourseDetail;