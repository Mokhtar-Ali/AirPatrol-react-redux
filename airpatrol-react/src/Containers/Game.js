import React, { useState, useEffect, useInterval } from 'react';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { assignAtmosphere, addTree, cutTree, increaseScore } from '../actionCreator'
import '../Css/game.css'


function Game(props) {
    const history = useHistory()
    const [weather, setWeather] = useState(0)
    const [temperature, setTemperature] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            displayWeather();
        }, 60000);

        if (props.currentUser) {
            fetch("http://localhost:3000/atmospheres", {
                method: "Post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_id: props.currentUser.id })
            })
                .then(resp => resp.json())
                .then(response => props.assignAtmosphere(response))
        } else { history.push('/') }
        displayWeather()
    }, [])


    function displayWeather() {
        const weather = ["Sunny  ☀️", "Rainy  🌧", "Cloudy  🌫", "Snowy  ❄️"];
        const randomCondition = weather[Math.floor(Math.random() * weather.length)];
        setWeather(randomCondition)

        if (randomCondition === "Sunny  ☀️") {
            setTemperature(Math.floor(Math.random() * (90 - 50)) + 50)
        } else if (randomCondition === "Rainy  🌧") {
            setTemperature(Math.floor(Math.random() * (70 - 40)) + 40)
        } else if (randomCondition === "Cloudy  🌫") {
            setTemperature(Math.floor(Math.random() * (60 - 40)) + 40)
        } else {
            setTemperature(Math.floor(Math.random() * (33 - 20)) + 1)
        }
    };

    function plantTree() {
        let data = { atmosphere_id: props.atmosphere.id };
        props.addTree(data)
        props.increaseScore()
    }

    function chopTree() {
        if(props.trees.length > 1){
            let treesCopy = [...props.trees]
            let id = treesCopy[treesCopy.length - 1].id
            props.cutTree(id)
        }else{
            window.alert('no no')
        }
    }


    return (
        <div>
            {props.atmosphere ?
                <div className='game'>
                    <div className='stats'>
                        <div className='left'>
                            <p>Name: {props.currentUser.name}</p>
                            <p>Score: {props.score}</p>
                            <p>Health: {props.health} % </p>
                            <p>Body Temperature: {props.bodyTemp} ℉ </p>
                        </div> {/* End Left div */}

                        <div className='middle '>
                            <p>Weather: {weather}</p>
                            <p>Temperature: {temperature}</p>
                            <p>Oxygen: {props.oxygen} </p>
                            <p>Carbon Dioxide: {props.carbon_dioxide} </p>

                        </div> {/* End middle div */}

                        <div className='right'>
                            <p>Trees Planted: {props.treesPlanted}</p>
                            <p>Trees Chopped: {props.treesChopped}</p>
                            <p>Firewood: {props.fireWood}</p>
                            <p>Fire: 100% </p>

                        </div> {/* End right div */}

                        <div className='tools'>
                            <h4 style={{ textAlign: 'center' }}>Tools</h4>
                            Plant Tree <button onClick={plantTree}><img src="https://media.istockphoto.com/vectors/illustration-of-human-hand-holding-green-small-tree-image-for-vector-id517049638?k=6&m=517049638&s=612x612&w=0&h=FNpXoH_gDwAlKBzYalzeSvZ3Hh8DfvcURin7nYz3x6g=" alt="seedling" class="img-size" /></button>
                            Water Tree <button > <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fst2.depositphotos.com%2F1060654%2F8908%2Fv%2F950%2Fdepositphotos_89087864-stock-illustration-watering-can-vector.jpg" alt="watering-can" class="img-size" /> </button>
                            Cut Tree <button onClick={chopTree}><img src="https://static.vecteezy.com/system/resources/previews/000/516/135/original/axe-in-the-stump-vector-illustration.jpg" alt="axe" class="img-size" /></button>

                        </div> {/* End tools div */}
                    </div> {/* End Stats div*/}
                    <hr />
                </div> // {/* End Game div */}

                : null}
        </div>
    )
}

const msp = state => {
    return {
        score: state.score,
        atmosphere: state.atmosphere,
        currentUser: state.currentUser,
        fireWood: state.fireWood,
        bodyTemp: state.bodyTemp,
        health: state.health,
        trees: state.trees,
        treesPlanted: state.treesPlanted,
        treesChopped: state.treesChopped,
        weather: state.weather,
        temperature: state.temperature,
        oxygen: state.oxygen,
        carbon_dioxide: state.carbon_dioxide
    }
}

export default connect(msp, { assignAtmosphere, addTree, cutTree, increaseScore })(Game)


// timer: 180, // work on logic for timer
// weather: "",
// temperature: null,
// bodyTemp: 99,
// health: 100