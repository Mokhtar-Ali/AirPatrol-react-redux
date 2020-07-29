import React from 'react'
import { withRouter } from 'react-router-dom';

class GameOver extends React.Component {

    startGame = () => {
        this.props.history.push('/')
    }
    
    render(){
        return (
            <div>
                <h1>Game Over</h1>
                <button onClick={this.startGame}>Restart Game</button>
            </div>
        )
    }
}

export default withRouter(GameOver)