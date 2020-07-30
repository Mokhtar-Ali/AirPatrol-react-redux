import React from 'react'
import '../Css/gameView.css'
import tree from '../images/Tree.png'

export default function Tree(props){

    return(
        <div className='tree'>
            <img className='tree-img' src={tree}/>
        </div>
    )
}