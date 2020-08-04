import React from 'react';
import { connect } from 'react-redux'
import '../Css/gameView.css'
import Tree from '../Components/Tree'
import Well from '../images/Well.png'
import Tent from '../images/Tent.png'
import Fire from '../images/Fire.png'
import Firewood from '../images/Firewood.png'


class GameView extends React.Component {

    renderFireWoood = () => {
        let fireWood = this.props.fireWood
        
    }

    render() {
        return (
            <div className='game-view' >
                <div className='trees'>
                    {this.props.trees.slice(0, 38).map(tree =>
                        <Tree
                            tree={tree}
                            key={tree.id}
                        />
                    )}
                </div>
                <div className='data'>
                    <div className='well-container'>
                        <img className='well' src={Well} />
                    </div>
                    <div className='person'>
                        <img className='tent' src={Tent} />
                    </div>
                    <div className='fire-container'>
                        <img className='fire' src={Fire} />
                    </div>
                    <div className='fire-wood-container'>
                            <img className='fire-wood' src={Firewood} />
                    </div>
                </div>
            </div>
        )
    }
}

const msp = (state) => {
    return {
        trees: state.trees,
        fireWood: state.fireWood
    }
}
export default connect(msp)(GameView)