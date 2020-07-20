import React from 'react';
import { connect } from 'react-redux'
import {
    assignAtmosphere,
    addTree, cutTree, waterTreeACreator,
    increaseScore, decreaseScore,
    moreFire, decreaseFire10, decreaseFire20,
    increaseHealth, decreaseHealth, decreaseBodyTempBy10, decreaseBodyTempBy20, increaseBodyTempBy10, increaseBodyTempBy20,
    fillWell, upgradeWell, reducerWaterSupply
} from '../actionCreator'
import '../Css/game.css'
import GameView from './GameView'


class Game extends React.Component {

    state = {
        weather: null,
        temperature: null
    }

    componentWillMount() {
        if (this.props.currentUser) {
            fetch("http://localhost:3000/atmospheres", {
                method: "Post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_id: this.props.currentUser.id })
            })
                .then(resp => resp.json())
                .then(response => this.props.assignAtmosphere(response))
        } //else { history.push('/') }

    }

    componentDidMount() {
        this.displayWeather()

        setInterval(() => {
            this.displayWeather()
           
        }, 3000);

        setInterval(() => {
            if(this.state.weather === "Rainy  🌧" ){
                this.props.fillWell()
            }
        }, 1000)

        setInterval(() => {
            this.feedFire()
        }, 2000);

        setInterval(() => { 
            if (this.props.fire === 0 && this.props.score >= 5 && this.state.temperature < 60) {
                this.props.decreaseScore()
            }
        }, 3000);

        setInterval(() => {
            if (this.props.fire === 0 && this.props.health >= 10 && this.state.temperature < 60) {
                this.props.decreaseHealth()
            }
        }, 3000)

        setInterval(() => {
            if (this.props.fire === 0 && this.props.bodyTemp >= 66 && this.state.temperature < 60) {
                this.props.decreaseBodyTempBy10()
            }
        }, 3000)

        setInterval(() => {
            if(this.props.fire > 0 && this.props.health <= 90){
                this.props.increaseHealth()
            }
        }, 3000)

        setInterval(() => {
            if(this.props.fire > 0 && this.props.bodyTemp <= 88){
                this.props.increaseBodyTempBy10()
            }
        }, 3000)

        setInterval(() => {
            if(this.props.health <= 10){
                window.alert('Game Over')
                // check for history.push
            }
        }, 10000)
    }

    componentDidUpdate() {

        // window.alert('No More FireWood, Chop some trees')
    }


    displayWeather = () => {
        const weather = ["Sunny  ☀️", "Rainy  🌧", "Cloudy  🌫", "Snowy  ❄️"];
        const randomCondition = weather[Math.floor(Math.random() * weather.length)];
        // setWeather(randomCondition)
        this.setState({ weather: randomCondition })

        if (randomCondition === "Sunny  ☀️") {
            this.setState({ temperature: (Math.floor(Math.random() * (90 - 50)) + 50) })

            if (this.props.bodyTemp <= 89) { this.props.increaseBodyTempBy10() }
        } else if (randomCondition === "Rainy  🌧") {
            this.setState({ temperature: (Math.floor(Math.random() * (70 - 40)) + 40) })

            if (this.props.bodyTemp <= 89) { this.props.increaseBodyTempBy10() }
        } else if (randomCondition === "Cloudy  🌫") {
            this.setState({ temperature: (Math.floor(Math.random() * (60 - 40)) + 40) })

            this.props.decreaseBodyTempBy10()
        } else {
            this.setState({ temperature: (Math.floor(Math.random() * (33 - 20)) + 20) })

            this.props.decreaseBodyTempBy20()
        }
    };

    plantTree = () => {
        let data = { atmosphere_id: this.props.atmosphere.id };
        if(this.state.temperature >= 50){
            this.props.addTree(data)
            this.props.increaseScore()
        } else {
            window.alert("It's too cold to plant tress now")
        }
    }

    chopTree = () => {
        if (this.props.trees.length > 1) {
            let treesCopy = [...this.props.trees]
            let id = treesCopy[treesCopy.length - 1].id
            this.props.cutTree(id)
        } else {
            // window.alert('no more trees to cut, better plant some')
        }
    }

    waterTree = () => {

        let id = this.props.trees[0].id
        // console.log(id);
        // console.log(props.trees);
        if(this.props.water_supply >= 1){
            this.props.waterTreeACreator(id)
            this.props.reducerWaterSupply()
        }else {
            window.alert('No water, wait for the rain, or upgrade Well Size')
        }
    };


    feedFire = () => {
        if (this.props.fire <= 20) {
            this.props.moreFire()
        } else {
            this.props.decreaseFire10()
        }
    }

    consumeFire = () => {
        if (this.state.temperature >= 40) {// decrease fire health every 10 seconds by 10% 
            this.props.decreaseFire10()
        } else {                // decrease fire health every 10 seconds by 20% 
            this.props.decreaseFire20()
        }
    }


    checkHealth = () => {
        if (this.props.fire < 10 || this.props.oxygen < this.props.carbon_dioxide || this.props.bodyTemp < 70) {
            this.props.decreaseHealth()
            this.props.decreaseScore()
            // window.alert('Your Health is at RISK, Check your Oxygen and Fire status!!')
        } else if (this.props.fire > 50 && this.props.oxygen > this.props.carbon_dioxide && this.props.health >= 90 && this.props.bodyTemp >= 80) {
            this.props.increaseHealth()
            // window.alert("You're doing GREAT!!")
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.atmosphere ?
                        <div className='game'>
                            <div className='stats'>
                                <div className='left'>
                                    <p>Name: {this.props.currentUser.name}</p>
                                    <p>Score: {this.props.score}</p>
                                    <p>Health: {this.props.health} % </p>
                                    <p>Body Temperature: {this.props.bodyTemp} ℉ </p>
                                </div> {/* End Left div */}

                                <div className='middle '>
                                    <p>Weather: {this.state.weather}</p>
                                    <p>Temperature: {this.state.temperature}</p>
                                    <p>Oxygen: {this.props.oxygen} </p>
                                    <p>Carbon Dioxide: {this.props.carbon_dioxide} </p>
                                    <p>Well Size: {this.props.well} </p>


                                </div> {/* End middle div */}

                                <div className='right'>
                                    <p>Trees Planted: {this.props.trees.length}</p>
                                    <p>Trees Chopped: {this.props.treesChopped}</p>
                                    <p>Firewood: {this.props.fireWood}</p>
                                    <p>Fire: {this.props.fire} </p>
                                    <p>Water: {this.props.water_supply}</p>

                                </div> {/* End right div */}

                                <div className='tools'>
                                    <h4 style={{ textAlign: 'center' }}>Tools</h4>
                                    Plant Tree <button onClick={this.plantTree}><img src="https://media.istockphoto.com/vectors/illustration-of-human-hand-holding-green-small-tree-image-for-vector-id517049638?k=6&m=517049638&s=612x612&w=0&h=FNpXoH_gDwAlKBzYalzeSvZ3Hh8DfvcURin7nYz3x6g=" alt="seedling" class="img-size" /></button>
                                    Water Tree <button onClick={this.waterTree} > <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fst2.depositphotos.com%2F1060654%2F8908%2Fv%2F950%2Fdepositphotos_89087864-stock-illustration-watering-can-vector.jpg" alt="watering-can" class="img-size" /> </button>
                                    Cut Tree <button onClick={this.chopTree}><img src="https://static.vecteezy.com/system/resources/previews/000/516/135/original/axe-in-the-stump-vector-illustration.jpg" alt="axe" class="img-size" /></button>
                                    Upgrade Well <button onClick={this.props.upgradeWell} >Upgrade</button>

                                </div> {/* End tools div */}
                            </div> {/* End Stats div*/}
                            
                            <GameView />
                        </div> // {/* End Game div */}

                        : null
                }
            </div >
        )
    }


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

export default connect(msp, { assignAtmosphere, addTree, cutTree, increaseScore, decreaseScore, moreFire, increaseHealth, decreaseHealth, decreaseFire10, decreaseFire20, decreaseBodyTempBy10, decreaseBodyTempBy20, increaseBodyTempBy10, increaseBodyTempBy20, waterTreeACreator, fillWell, upgradeWell, reducerWaterSupply})(Game)


// timer: 180, // work on logic for timer
// weather: "",
// temperature: null,
// bodyTemp: 99,
// health: 100