import React, { useEffect, useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom';
import useIsMounted from './helpers/IsMounted';

const Courses = () => {
  const isMounted = useIsMounted();
  let history = useHistory();

  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/courses')
      if (response.status === 200 || response.status === 304) {
        return response.json().then(data => data);
      }
    } catch (error) {
      history.push('/error');
    }       
  }

  useEffect(() => {
    (async() => {
      const coursesData = await getCourses();
      if (isMounted.current) {
        setCourses(coursesData);
      }
    })()
  }, [])

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