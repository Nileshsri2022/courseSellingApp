import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Card, Typography } from '@mui/material';
import { useState } from 'react';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant={'h6'}>
          Welcome to Coursera. Sign in below
        </Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card varint={'outlined'} style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={'password'}
          />
          <br />
          <br />

          <Button
            size={'large'}
            variant="contained"
            onClick={() => {
              function callback2(data) {
                // console.log("Data=>"+data.token);
                localStorage.setItem('token', data.token);
                window.location = '/';
              }
              function callback1(res) {
                res.json().then(callback2);
              }
              fetch('http://localhost:3000/admin/login', {
                method: 'POST',
                headers: {
                  username: email,
                  password: password,
                  Authorization: 'Bearer ' + localStorage.getItem('token'),
                  'Content-type': 'application/json',
                },
              }).then(callback1);
            }}
          >
            {' '}
            Signin
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signin;
