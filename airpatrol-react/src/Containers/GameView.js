import React from 'react';
import { connect } from 'react-redux'
import '../Css/gameView.css'


class GameView extends React.Component {


    render() {
        return (
            <div className='game-view' >
                <div className='sky'>  
                <image className='sky-pic' />
                </div>
                <div className='game-data'>
                    <div className='left-side'> left-side</div>
                    <div className='habitation'>
                        <div className='green-space'>green-space</div>
                        <div className='person-space'>
                            <div className='health-bar'>health-bar</div>
                            <div className='person'> person</div>
                            <div className='fire'>fire</div>
                            <div className='fire-health'>fire-health</div>
                        </div>
                    </div>
                    <div className='right-side'>Trees</div>
                </div>
            </div>
        )
    }
}

export default connect(null)(GameView)