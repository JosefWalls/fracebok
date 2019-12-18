import React from 'react'
import {connect} from 'react-redux'
import {editTrack, updateState} from "./../daffy_duck/raceReducer"
import {Link} from 'react-router-dom';
import axios from 'axios'
import "./scss/editTemplate.css"

class Edittrack extends React.Component {
    constructor(){
        super()

        this.setState({
            track_name: "",
            turns: "",
            length: ""
        })
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        this.props.updateState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const track_id = this.props.match.params.track_id
        axios.put(`/races/EditTrack/${track_id}`, {
            track_name: this.state.track_name,
            turns: this.state.turns,
            length: this.state.length
        })
        .then(() => {
            this.props.history.push("/Races")
        })
    }

    render(){
        return(
            <div className="main">
                <div className="header">
                     <p id="logo">Fracebok</p>
                </div>
                <div className="editProfileCard">
                    <h1>Edit Track Name</h1>
                <input placeholder="Enter Track Name" name="track_name" onChange={this.handleChange}></input>
                    <h1>Edit Track Turns</h1>
                <input placeholder="Enter Track Turns" name="turns" onChange={this.handleChange}></input>
                    <h1>Edit Track Length</h1>
                <input placeholder="Enter Track Length" name="length" onChange={this.handleChange}></input>
                <div className="editButtons">
                <button onClick={this.handleSubmit}>Submit Updates</button>
                <Link to="/Races">
                    <button>Cancel</button>
                </Link>
                </div>
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

export default connect(mapStateToProps, {updateState, editTrack})(Edittrack);