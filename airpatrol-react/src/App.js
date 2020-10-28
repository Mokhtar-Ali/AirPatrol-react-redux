import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './App.css';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import Instructions from './Components/Instructions'
import Signup from './Forms/Signup';
import Login from './Forms/Login';
import { assignUser } from './actionCreator'

function App(props) {
  // window.location.reload(true)

  const [switchLoginToSignup, setswitchLoginSignup] = useState(false)
  const history = useHistory()

  useEffect(() => {
    // window.location.reload()
    const user_id = localStorage.user_id;
    if (user_id) {
      fetch("http://localhost:3000/auto_login", {
        headers: {
          Authorization: user_id
        }
      })
        .then(resp => resp.json())
        .then(response => {
          if (response.errors) {
            alert(response.errors);
          } else {
            props.assignUser(response);
          }
        });
    }
  },[])


  return (
    <div className="App">
      <Instructions />
      {props.currentUser ?
        <div className='instructions-2'>
          <Button className='app-button' variant="contained" color="Green" onClick={() => history.push('/game')}> Start Game </Button>
        </div>
        : <div className='instructions-2'>
          {switchLoginToSignup ? <Signup /> : <Login />}
          <Button className='app-button' variant="contained" color="Green" onClick={() => setswitchLoginSignup(!switchLoginToSignup)}>Switch to Signup</Button>

        </div>
      }
      <footer>&copy; Copyright 2020 Jay & Mocha</footer>
    </div>
  );
}

const msp = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(msp, { assignUser })(App)
