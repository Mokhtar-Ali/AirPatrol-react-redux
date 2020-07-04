import React, { useState } from 'react';
import './App.css';
import { connect } from 'react-redux'
import Instructions from './Components/Instructions'
import Signup from './Forms/Signup';
import Login from './Forms/Login';

function App(props) {
  const [switchLoginToSignup, setswitchLoginSignup] = useState(false)

  return (
    <div className="App">
      <Instructions />
      {props.currentUser ?
        <button> Start Game </button>
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

export default connect(msp)(App)
