import React from 'react';
import { connect } from 'react-redux'
import '../Css/gameView.css'
import Tree from '../Components/Tree'


class GameView extends React.Component {


    render() {
        return (
            <div className='game-view' >
                <div className='trees'>
                    {this.props.trees.map(tree =>
                        <Tree
                            tree={tree}
                            key={tree.id}
                        />
                    )}
                </div>
                <div className='data'>
                    <div className='well'></div>
                    <div className='person'></div>
                    <div className='fire'></div>
                    <div className='fire-wood'></div>
                </div>
            </div>
        )
    }
}

const msp = (state) => {
    return {
        trees: state.trees
    }
}
export default connect(msp)(GameView)