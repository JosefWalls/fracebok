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
    }

    render(){
        return (
            <div>
                <p>AddTrack</p>
                <Link to="/Races">
                    <button>Back to Races</button>
                </Link>
                <input placeholder="Track Name" name="track_name" onChange={this.handleChange}></input>
                <input placeholder="Track Turns" name="turns" onChange={this.handleChange}></input>
                <input placeholder="Track length" name="length" onChange={this.handleChange}></input>
                <Link to="/Races">
                    <button onClick={this.handleAdd}>Add Track</button>
                </Link>
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