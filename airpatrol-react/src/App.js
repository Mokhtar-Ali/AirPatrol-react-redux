import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './App.css';
import { connect } from 'react-redux'
import Instructions from './Components/Instructions'
import Signup from './Forms/Signup';
import Login from './Forms/Login';
import { assignUser } from './actionCreator'

function App(props) {
  const [switchLoginToSignup, setswitchLoginSignup] = useState(false)
  const history = useHistory()

  useEffect(() => {
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
  }, [])


  return (
    <div className="App">
      <Instructions />
      {props.currentUser ?
        <button onClick={()=> history.push('/game')}> Start Game </button>
        : <div>
          {switchLoginToSignup ? <Signup /> : <Login />}
          <button onClick={() => setswitchLoginSignup(!switchLoginToSignup)}>Switch to Signup</button>
        </div>
      }

    </div>
  );
}

const msp = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(msp, {assignUser})(App)
