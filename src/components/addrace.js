import React from 'react';
import {Link} from 'react-router-dom'
import {retrieveUserTracks, updateState} from "./../daffy_duck/raceReducer"
import {connect} from 'react-redux';
import {getGarage} from "./../daffy_duck/garageReducer"
import Axios from 'axios';
import {storage} from "./../firebase-config"
class Addrace extends React.Component {
    constructor(){
        super()

        this.state = {
            track_id: "",
            car_id: "",
            laps: [],
            lap: "",
            sessionId: "",
            header: "",
            firstTime: true
        }
    }
    

    componentDidMount(){
        const randomNum = (Math.random()*254999999)
        this.props.updateState({sessionId: randomNum})
        this.props.getGarage()
    }

    handleChange = (e) => {
        this.setState({lap: e.target.value})
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        this.setState({laps: [...this.state.laps, this.state.lap]})
        this.setState({lap: ""})
        await Axios.post("/races/Addlap", {
            time: this.state.lap,
            track_id: this.props.track_id,
            car_id: this.props.car_id,
            session_id: this.props.sessionId,
            header: this.state.header,
            firstTime: this.state.firstTime
        })
        .then(() => {
            this.setState({lap: "", firstTime: false})
        })
    }

    handleHeader = (e) => {
        if(e.target.files[0]){
            const image = e.target.files[0]
            const uploadTask = storage.ref(`/sessionHeaders/${image.name}`).put(image)
            uploadTask.on("state_changed", 
                () => {
                    storage.ref('sessionHeaders').child(image.name).getDownloadURL()
                    .then(url => {
                        this.setState({header: url})
                    })
                }
            )}
    }

    render(){
        const dropdownTracks = this.props.userTracks.map((val, i) => {
            return (
                <button onClick={() => this.props.updateState({track_id: val.track_id})}>{val.track_name}</button>
            )
        })
        const mappedCars = this.props.userCars.map((val, i) => {
            return (
                <button onClick={() => this.props.updateState({car_id: val.car_id})}>{val.year} {val.make} {val.model}</button>
            )
        })
        const mappedLaps = this.state.laps.map((val, i) => {
            return (
                <p>{val}</p>
            )
        })
        
        return (
            <div>
                <p>Add race</p>
                <Link to="/Races">
                    <button>Back to races</button>
                </Link>
                <div className="mapped">
                    <h1>Select Track</h1>
                    <div className="garage">
                        {dropdownTracks}
                    </div>
                    <h1>Select Car</h1>
                    <div className="garage">
                        {mappedCars}
                    </div>
                        <h1>Upload header:</h1>
                        <input type="file" placeholder="Upload header" onChange={this.handleHeader}></input>
                    {/* <div className="garage">
                        <h1>Select weather conditions</h1>
                            <button placeholder="Dry"></button>
                            <button placeholder="Damp"></button>
                            <button placeholder="Wet"></button>
                            
                    </div> */}
                    <form onSubmit={this.handleSubmit}>
                        {mappedLaps}
                        <h1>Add lap times:</h1>
                        <input placeholder="Enter lap time. Ex) 1:25.288" onChange={this.handleChange} value={this.state.lap}></input>
                    </form>
                        <Link to="/Races">
                            <button >Add race</button>
                        </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        userTracks: reduxState.RaceReducer.userTracks,
        userCars: reduxState.GarageReducer.garage,
        track_id: reduxState.RaceReducer.track_id,
        car_id: reduxState.RaceReducer.car_id,
        laps: reduxState.RaceReducer.laps,
        sessionId: reduxState.RaceReducer.sessionId
    }
}

export default connect(mapStateToProps, {retrieveUserTracks, getGarage, updateState})(Addrace)