// import React from 'react'
import React from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "../Css/Login.css";
import { connect } from 'react-redux'
import { assignUser } from '../actionCreator'

class LoginForm extends React.Component {

    state = {
        name: '',
        password: ''
    }



    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, 
            body: JSON.stringify(this.state)
            
        }).then(res => res.json())
        .then(response => {
          if (response.errors){
            alert(response.errors)
          } else {
            this.props.assignUser(response)
            // this.props.history.push('/game')
          }
        })
        this.setState({name: '', password: ''})
        
      }

 
    render() {
        // console.log(this.props.currentUser)
        return (
            
            <div className="Login">
                <Button disabled> Start Game </Button>
                <h3 style={{textAlign: 'center'}}>Log In To Play</h3>
                <form onSubmit={this.handleSubmit} id='form'>
                    <FormGroup controlId="email" bssize="large">
                        
                        <FormControl
                            autoFocus
                            type="text"
                            name='name'
                            placeholder='Name'
                            value={this.state.name}
                            onChange={this.handleChange}
                            style={{textAlign: 'center'}}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        
                        <FormControl
                            type="password"
                            name='password'
                            placeholder='Password'
                            value={this.state.password}
                            onChange={this.handleChange}
                            style={{textAlign: 'center'}}
                        />
                    </FormGroup>
                    <Button block bsSize="large" type="submit" style={{marginTop: '10px'}}>
                        Login
                    </Button>
                </form>
            </div>
        )}
}


export default connect(null, { assignUser })(LoginForm)