import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [courses, setCourses] = useState([]);

  const getCourses = () => {
      fetch('http://localhost:5000/api/courses')
        .then(res => res.json())
        .then(data => setCourses(data))
        .catch(err => {
          console.error(err);
        })
  }

  useEffect(() => {
    getCourses();
  }, [])

  return (

    <div className="App">
      <ul>
        {courses.map((course,index) => {
          return <li key={index}>{course.title}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
