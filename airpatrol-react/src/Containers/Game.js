import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { assignAtmosphere } from '../actionCreator'


function Game(props) {

    useEffect(() => {
        fetch("http://localhost:3000/atmospheres", {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id: props.currentUser.id })
        })
            .then(resp => resp.json())
            .then(response => props.assignAtmosphere(response))
    }, [])


    return (
        <div>
            {props.atmosphere ?
                <div>
                    <h2>{props.currentUser.name}</h2>
                    <h2>{props.atmosphere.id}</h2>
                    <h2>{props.trees.length}</h2>
                    <h2>{props.score}</h2>
                </div>
                : null}
        </div>
    )
}

const msp = state => {
    return {
        score: state.score,
        trees: state.trees,
        atmosphere: state.atmosphere,
        currentUser: state.currentUser,
    }
}

export default connect(msp, { assignAtmosphere })(Game)