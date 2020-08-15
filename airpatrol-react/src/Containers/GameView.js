import React from 'react';
import { connect } from 'react-redux'
import '../Css/gameView.css'
import Tree from '../Components/Tree'
import Well from '../images/Well.png'
import Tent from '../images/Tent.png'
import Fire from '../images/Fire.png'
import FirePit1 from '../images/fire-pit1.png'
import FirePit2 from '../images/fire-pit2.png'
import Firewood from '../images/Firewood.png'
import FIREWOOD from '../Components/FIREWOOD'



class GameView extends React.Component {

    renderFireWoood = () => {
        let array = []
        for (let i = 2; i < this.props.fireWood; i+=3) {
            array.push(<FIREWOOD key={i} img={Firewood}/>)
        }
        return array
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
                        {this.props.fire ?
                            <img className='fire' src={Fire} />
                            : <img className='fire' src={FirePit1} />
                        }
                    </div>
                    <div className='fire-wood-container'>
                        {this.renderFireWoood()}
                        {/* <img className='fire-wood' src={Firewood} /> */}
                    </div>
                </div>
            </div>
        )
    }
}

const msp = (state) => {
    return {
        trees: state.trees,
        fireWood: state.fireWood,
        fire: state.fire
    }
}
export default connect(msp)(GameView)