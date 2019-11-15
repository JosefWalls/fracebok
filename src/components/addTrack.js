import React from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {updateState} from "./../daffy_duck/raceReducer"
import axios from 'axios'

class AddTrack extends React.Component {
    constructor(){
        super()

        this.state = {
        }
    }

    handleChange = (e) => {
        this.props.updateState({[e.target.name]: e.target.value})
    }

    handleAdd = (e) => {
        e.preventDefault();
        axios.post("/races/addRace", {
            track_name: this.props.track_name,
            turns: this.props.turns,
            length: this.props.length
        })
        this.props.history.push("/Races")
    }

    render(){
        return (
            <div className="main">
                <div className="header">
                    <p id="logo">Fracebok</p>
                </div>
                <p id="racesTitle">AddTrack</p>
                <div className="addCarCard">
                <input placeholder="Track Name" name="track_name" onChange={this.handleChange}></input>
                <input placeholder="Track Turns" name="turns" onChange={this.handleChange}></input>
                <input placeholder="Track length" name="length" onChange={this.handleChange}></input>
                    <button onClick={this.handleAdd}>Add Track</button>
                <Link to="/Races">
                    <button>Back to Races</button>
                </Link>
                </div>
            </div>
        )
    }
}


const mapStateToProps = reduxState => {
    return {
        track_name: reduxState.RaceReducer.track_name,
        turns: reduxState.RaceReducer.turns,
        length: reduxState.RaceReducer.length
    }
}

export default connect(mapStateToProps, {updateState})(AddTrack);