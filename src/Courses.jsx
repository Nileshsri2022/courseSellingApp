import { Card, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    function callback2(data) {
      console.log(data)
      console.log(data.courses)
      setCourses(data.courses);
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch('http://localhost:3000/admin/courses', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then(callback1);
  }, []);

  return (
    <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
      Courses{JSON.stringify(courses)}
      {courses.map((course) =>{
        return <Course course={course} key={Math.random()} />
      })}
    </div>
  );
}
function Course(props) {
  return (
    <Card style={{
      margin:10,
      width:300 ,
      minHeight:200
    }}>

      <Typography variant='h6'textAlign={'center'}>{props.course.title}</Typography>

      <Typography textAlign={'center'} variant='p'>{props.course.description}</Typography>
      <img src={props.course.imageLink} alt="" style={{width:300}}/>
    </Card>
  );
}
export default Courses;
