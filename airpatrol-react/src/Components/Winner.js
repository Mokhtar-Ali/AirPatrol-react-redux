import React from 'react'
import { withRouter } from 'react-router-dom';
import { restartGame } from '../actionCreator'
import { connect } from 'react-redux'

class Winner extends React.Component {

    startGame = () => {
        this.props.restartGame()
        this.props.history.push('/')
    }
    
    render(){
        return (
            <div>
                <h1>Thank You for saving the Enviroment</h1>
                <p>Because of your efforts, Oxygen level is high while the Carbon Dioxide is very low!!</p>
                <button onClick={this.startGame}>Restart Game</button>
            </div>
        )
    }
}

export default connect(null, { restartGame })(withRouter(Winner))