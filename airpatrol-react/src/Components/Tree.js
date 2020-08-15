import React from 'react'
import '../Css/gameView.css'
import tree from '../images/Tree.png'
import tree1 from '../images/Tree1.png'
import tree2 from '../images/Tree2.png'

export default function Tree(props) {
    const size = props.tree.size
    return (
        <div className='tree'>
            {size === 'small' ?
                <img className='tree-img-s' src={tree1} /> : (size === 'medium' ? <img className='tree-img-med' src={tree1} /> : <img className='tree-img-lg' src={tree1} />)
            }
        </div>
    )
}