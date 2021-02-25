import React, { useEffect, useState } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom';
// import IsMounted helper function
import useIsMounted from './helpers/IsMounted';

const Courses = () => {
  // get access to isMounted variable
  const isMounted = useIsMounted();
  // instantiate a history object
  let history = useHistory();
  // setup the courses state
  const [courses, setCourses] = useState([]);
  // Fetch initial data for the homepage
  const getCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/courses')
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

  useEffect(() => {
    (async() => {
      const coursesData = await getCourses();
      // Check to see if component is mounted before trying to update the state
      if (isMounted.current) {
        setCourses(coursesData);
      }
    })()
  }, []);

  if (courses === 404) {
    // Redirects to notfound route if 404 received
    return <Redirect to="/notfound" />
    // Redirects to error route if 500 received
  } else if (courses === 500) {
    return <Redirect to="/error" /> 
  }

  return (
    <div className="bounds">
      {courses ? courses.map(course => {
        return (
          <div key={course.id} className="grid-33"><Link className="course--module course--link" to={`/courses/${course.id}/detail`}>
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
          </Link></div>
        )
      }): null}
      <div className="grid-33"><Link className="course--module course--add--module" to="/courses/create">
            <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </Link></div>
    </div>
  )
}

export default Courses;