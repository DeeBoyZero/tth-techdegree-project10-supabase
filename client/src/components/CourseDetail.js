import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory, Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import useIsMounted from './helpers/IsMounted';

const CourseDetail = ({ context }) => {
  const isMounted = useIsMounted();

  let history = useHistory();

  const currentUser = context.authenticatedUser || '';

  const { id } = useParams()

  const [course, setCourse] = useState([]);

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

  const deleteCourse = () => {
    context.data.deleteCourse(id, context.currentUsername, context.currentUserPass)
    .then( errors => {
      if (errors.length) {
        console.log(errors);
      } else {
        history.push("/");  
      }
    })
    .catch((err) => {
      history.push('/error');
    });
  }

  useEffect(() => {
    (async () => {
      const myCourse = await getCourseDetail();
      if(isMounted.current) {
        setCourse(myCourse);
      }
    })()
  }, [])

  if (course) {
    if (course === 404) {
      return <Redirect to="/notfound" />
    } else if (course === 500) {
      return <Redirect to="/error" /> 
    } else {
      return (
        <div>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">{currentUser.id === course.userId ? <span><Link className="button" to={`/courses/${id}/update`}>Update Course</Link><Link className="button" onClick={deleteCourse} to="/">Delete Course</Link></span> : null }<Link
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
                  {course.description ? <ReactMarkdown source={course.description} /> : null}
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
                            return <li key={index}><ReactMarkdown source={item} /></li>
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