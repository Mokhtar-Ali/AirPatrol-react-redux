import React, { useState, useEffect, useInterval } from 'react';
import { connect } from 'react-redux'
import { assignAtmosphere } from '../actionCreator'
import '../Css/game.css'


function Game(props) {

    const [weather, setWeather] = useState(0)
    const [temperature, setTemperature] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            displayWeather();
          }, 60000);
      
        fetch("http://localhost:3000/atmospheres", {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id: props.currentUser.id })
        })
            .then(resp => resp.json())
            .then(response => props.assignAtmosphere(response))
            displayWeather()
    }, [])


    function displayWeather(){
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
    
    //   const changeWeather = useInterval(displayWeather, 5000);

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
                            <p>Oxygine: 0 </p>
                            <p>Carbon Dioxide: 0 </p>

                        </div> {/* End middle div */}

                        <div className='right'>
                            <p>Trees Planted: {props.trees.length}</p>
                            <p>Trees Chopped: {props.treesChopped}</p>
                            <p>Firewood: {props.fireWood}</p>

                        </div> {/* End right div */}

                        <div className='tools'>
                            <p>Plant Tree</p>
                            <p>Cut Tree</p>
                            <p>Water Tree</p>

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
        trees: state.trees,
        atmosphere: state.atmosphere,
        currentUser: state.currentUser,
        fireWood: state.fireWood,
        bodyTemp: state.bodyTemp,
        health: state.health,
        treesChopped: state.treesChopped,
        weather: state.weather,
        temperature: state.temperature
    }
}

export default connect(msp, { assignAtmosphere })(Game)


// timer: 180, // work on logic for timer
// weather: "",
// temperature: null,
// bodyTemp: 99,
// health: 100