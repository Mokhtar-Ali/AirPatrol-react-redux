import React from 'react'
import '../Css/gameView.css'
import tree from '../images/Tree.png'
import tree1 from '../images/Tree1.png'
import tree2 from '../images/Tree2.png'

export default function Tree(props){

    return(
        <div className='tree'>
            <img className='tree-img' src={tree1}/>
        </div>
    )
}