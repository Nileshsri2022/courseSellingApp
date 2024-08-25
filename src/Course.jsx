import { Button, Card, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

function Course() {
  console.log('hit there from Course');
  let { courseId } = useParams();
  const setCourses=useSetRecoilState(coursesState)

  useEffect(() => {
    function callback2(data) {
      console.log(data);
      console.log(data.courses);
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CourseCard  courseId={courseId}/>
      <UpdateCard courseId={courseId}/>
    </div>
  );

  function UpdateCard(props) {
    console.log('hi there from UpdateCard');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [courses,setCourses]=useRecoilState(coursesState)

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card variant={'outlined'} style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth={true}
            label="Title"
            variant="outlined"
          />

          <TextField
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
          />
          <TextField
            onChange={(e) => {
              setImage(e.target.value);
            }}
            fullWidth={true}
            label="Image Link"
            variant="outlined"
          />

          <Button
            size={'large'}
            variant="contained"
            onClick={() => {
              function callback2() {
                // localStorage.setItem("token", data.token);
                // window.location="/"
                // console.log("Data=>"+data.title)
                let updatedCourses = [];
                for (let i = 0; i < courses.length; i++) {
                  if (courses[i].id == props.courseId) {
                    updatedCourses.push({
                      id: courseId,
                      title: title,
                      description: description,
                      imageLink: image,
                      published: true,
                    });
                  } else {
                    updatedCourses.push(courses[i]);
                  }
                }
                setCourses(updatedCourses);
              }
              function callback1(res) {
                res.json().then(callback2);
              }
              fetch('http://localhost:3000/admin/courses/' + props.courseId, {
                method: 'PUT',
                body: JSON.stringify({
                  title: title,
                  description: description,
                  imageLink: image,
                  published: true,
                }),
                headers: {
                  // this line is important otherwise worng output
                  'Content-type': 'application/json',
                  Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
              }).then(callback1);
            }}
          >
            {' '}
            Update course
          </Button>
        </Card>
      </div>
    );
  }

  function CourseCard(props) {
    const courses=useRecoilValue(coursesState)
    console.log('hi there from CourseCard');
    let course=null
    for(let i=0;i<courses.length;i++){
      if(courses[i].id==props.courseId){
        course=courses[i]
      }
    }
    if(!course){
      return "loading"
    }
    return (
      <div>
        <Card
          style={{
            margin: 10,
            width: 300,
            minHeight: 200,
          }}
        >
          <Typography variant="h6" textAlign={'center'}>
            {course.title}
          </Typography>

          <Typography textAlign={'center'} variant="p">
            {course.description}
          </Typography>
          <img src={course.imageLink} alt="" style={{ width: 300 }} />
        </Card>
      </div>
    );
  }
}
export default Course;

// when update course is clicked the three components get render that is UpdateCard,CourseCard and Course because const [courses, setCourses] = useState([]); is defined in Top level(parent)which is not good
// State management lib Redux,Recoil,Zustand
const coursesState = atom({
  key: 'coursesState',
  default: '',
});
// https://gist.github.com/Nileshsri2022/c7627ff15524ba18fa4a6677aea9dd2e