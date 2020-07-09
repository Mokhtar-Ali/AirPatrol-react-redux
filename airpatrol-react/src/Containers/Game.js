import React, { useState, useEffect, useInterval } from 'react';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { assignAtmosphere, addTree, cutTree, increaseScore, decreaseScore, moreFire, increaseHealth, decreaseHealth, decreaseFire10, decreaseFire20, decreaseBodyTempBy10, decreaseBodyTempBy20, increaseBodyTempBy10, increaseBodyTempBy20, waterTreeACreator } from '../actionCreator'
import '../Css/game.css'


function Game(props) {
    const history = useHistory()
    const [weather, setWeather] = useState(0)
    const [fire, setFire] = useState(0)
    const [fireWood, setFireWood] = useState(10)
    const [temperature, setTemperature] = useState(0)

    useEffect(() => {

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

        // const interval = setInterval(() => {
        //     if (fire < 50) {
        //         let newFire = 100
        //         let newFireWood = fireWood - 2
        //         setFire(newFire)
        //         setFireWood(newFireWood)
        //     } else if (fire > 50) {
        //         let newFire = fire - 10
        //         setFire(newFire)
        //     }
        // }, 3000);

        // return () => clearInterval(interval);
    }, [])






    function displayWeather() {
        const weather = ["Sunny  ☀️", "Rainy  🌧", "Cloudy  🌫", "Snowy  ❄️"];
        const randomCondition = weather[Math.floor(Math.random() * weather.length)];
        setWeather(randomCondition)

        if (randomCondition === "Sunny  ☀️") {
            setTemperature(Math.floor(Math.random() * (90 - 50)) + 50)
            if (props.bodyTemp <= 89) { props.increaseBodyTempBy10() }
        } else if (randomCondition === "Rainy  🌧") {
            setTemperature(Math.floor(Math.random() * (70 - 40)) + 40)
            if (props.bodyTemp <= 89) { props.increaseBodyTempBy10() }
        } else if (randomCondition === "Cloudy  🌫") {
            setTemperature(Math.floor(Math.random() * (60 - 40)) + 40)
            props.decreaseBodyTempBy10()
        } else {
            setTemperature(Math.floor(Math.random() * (33 - 20)) + 1)
            props.decreaseBodyTempBy20()
        }
    };

    function plantTree() {
        let data = { atmosphere_id: props.atmosphere.id };
        props.addTree(data)
        props.increaseScore()
    }

    function chopTree() {
        if (props.trees.length > 1) {
            let treesCopy = [...props.trees]
            let id = treesCopy[treesCopy.length - 1].id
            props.cutTree(id)
        } else {
            // window.alert('no more trees to cut, better plant some')
        }
    }

    function waterTree() {
        let id = props.trees[0].id
        console.log(id);
        console.log(props.trees);
        props.waterTreeACreator(id)

        // let smallTrees = this.state.trees.filter(tree => tree.size === "small");
        // let mediumTrees = this.state.trees.filter(tree => tree.size === "medium");
        // let myTrees = [...this.state.trees]
        // let data;
        // if (smallTrees.length >= 1) {
        //     data = { size: "medium", oxygen: 5, carbon_dioxide: -4, firewood: 1 };
        //     let id = smallTrees[0].id;
        //     fetch(`http://localhost:3000/trees/${id}`, {
        //         method: "PATCH",
        //         headers: {
        //             "Content-Type": "application/json",
        //             Accept: "application/json"
        //         },
        //         body: JSON.stringify(data)
        //     })
        //         .then(resp => resp.json())
        //         .then(response => {
        //             let trees2 = [...this.state.trees];
        //             let index = trees2.findIndex(t => t.id === id);
        //             trees2.splice(index, 1, response);
        //             this.setState({ trees: trees2 });
        //             smallTrees.splice(0, 1)
        //             console.log(smallTrees, 'small trees?')
        //         });
        // } else if (smallTrees.length >= 1 && mediumTrees) {
        //     data = { size: "large", oxygen: 7, carbon_dioxide: -6, firewood: 2 };
        //     let id = smallTrees[0].id;
        //     fetch(`http://localhost:3000/trees/${id}`, {
        //         method: "PATCH",
        //         headers: {
        //             "Content-Type": "application/json",
        //             Accept: "application/json"
        //         },
        //         body: JSON.stringify(data)
        //     })
        //         .then(resp => resp.json())
        //         .then(response => {
        //             let trees2 = [...this.state.trees];
        //             let index = trees2.findIndex(t => t.id === id);
        //             trees2.splice(index, 1, response);
        //             // debugger
        //             this.setState({ trees: trees2 });
        //         });
        // } else {
        //     alert("All trees have been watered and there's more oxygen for everybody!😁");
        // }
    };


    function feedFire() {
        setFire(100)
        setFireWood(fireWood -= 2)
    }

    function consumeFire() {
        if (temperature >= 40) {// decrease fire health every 10 seconds by 10% 
            props.decreaseFire10()
        } else {                // decrease fire health every 10 seconds by 20% 
            props.decreaseFire20()
        }
    }


    function checkHealth() {
        if (props.fire < 10 || props.oxygen < props.carbon_dioxide || props.bodyTemp < 70) {
            props.decreaseHealth()
            props.decreaseScore()
            // window.alert('Your Health is at RISK, Check your Oxygen and Fire status!!')
        } else if (props.fire > 50 && props.oxygen > props.carbon_dioxide && props.health >= 90 && props.bodyTemp >= 80) {
            props.increaseHealth()
            // window.alert("You're doing GREAT!!")
        }
        else {
            return
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
                            <p>Well Size: {props.well} </p>


                        </div> {/* End middle div */}

                        <div className='right'>
                            <p>Trees Planted: {props.trees.length}</p>
                            <p>Trees Chopped: {props.treesChopped}</p>
                            <p>Firewood: {fireWood}</p>
                            <p>Fire: {fire} </p>
                            <p>Water: {props.water_supply}</p>

                        </div> {/* End right div */}

                        <div className='tools'>
                            <h4 style={{ textAlign: 'center' }}>Tools</h4>
                            Plant Tree <button onClick={plantTree}><img src="https://media.istockphoto.com/vectors/illustration-of-human-hand-holding-green-small-tree-image-for-vector-id517049638?k=6&m=517049638&s=612x612&w=0&h=FNpXoH_gDwAlKBzYalzeSvZ3Hh8DfvcURin7nYz3x6g=" alt="seedling" class="img-size" /></button>
                            Water Tree <button onClick={waterTree} > <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fst2.depositphotos.com%2F1060654%2F8908%2Fv%2F950%2Fdepositphotos_89087864-stock-illustration-watering-can-vector.jpg" alt="watering-can" class="img-size" /> </button>
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
        currentUser: state.currentUser,
        atmosphere: state.atmosphere,
        trees: state.trees,
        treesPlanted: state.treesPlanted,
        treesChopped: state.treesChopped,
        fire: state.fire,
        fireWood: state.fireWood,
        bodyTemp: state.bodyTemp,
        health: state.health,
        weather: state.weather,
        temperature: state.temperature,
        oxygen: state.oxygen,
        carbon_dioxide: state.carbon_dioxide,
        well: state.well,
        water_supply: state.water_supply
    }
}

export default connect(msp, { assignAtmosphere, addTree, cutTree, increaseScore, decreaseScore, moreFire, increaseHealth, decreaseHealth, decreaseFire10, decreaseFire20, decreaseBodyTempBy10, decreaseBodyTempBy20, increaseBodyTempBy10, increaseBodyTempBy20, waterTreeACreator })(Game)


// timer: 180, // work on logic for timer
// weather: "",
// temperature: null,
// bodyTemp: 99,
// health: 100