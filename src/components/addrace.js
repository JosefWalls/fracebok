import React from 'react';
import {Link} from 'react-router-dom'
import {retrieveUserTracks, updateState} from "./../daffy_duck/raceReducer"
import {connect} from 'react-redux';
import {getGarage} from "./../daffy_duck/garageReducer"
import Axios from 'axios';
import {storage} from "./../firebase-config";
import "./sass/addrace.css"
import StopWatch from "./stopwatch"


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
            firstTime: true,
            toggleMenu: "menuClosed",
            toggleIcon: "toggleMenuOn"
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

    handleClick = () => {
        if(this.state.toggleMenu === "menuClosed"){
            this.setState({toggleMenu: "menuOpen"})
            this.setState({toggleIcon: "toggleMenuOff"})
        } else {
            this.setState({toggleMenu: "menuClosed"})
            this.setState({toggleIcon: "toggleMenuOn"})
        }
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
                <p id="mappedLap">{val}</p>
            )
        })
        
        return (
            <div className="main">
            <div className="header">
                <p id="logo">Fracebok</p>
            </div>
                <p id="editCarTitle">Add race</p>
                <div className="garageFlyout">
                        <div className={this.state.toggleMenu}>
                        <img onClick={this.handleClick} id={this.state.toggleIcon} src="https://icon-library.net/images/menu-icon-white-png/menu-icon-white-png-27.jpg"></img>
                <Link to="/Races">
                    <button id="button2">Back to races</button>
                </Link>
                 </div>
                </div>
                <div className="mainRaceCard">
                <div className="addRaceCard">
                    <div className="dropdownTracks">
                    <h1>Select Track</h1>
                        {dropdownTracks}
                    </div>
                    <div className="dropdownCars">
                    <h1>Select Car</h1>
                        {mappedCars}
                    </div>
                        <h1 id="uploadTitle">Upload header:</h1>
                        <input type="file" placeholder="Upload header" onChange={this.handleHeader} id="fileUpload"></input>
                    <form onSubmit={this.handleSubmit}>
                        {mappedLaps}
                        <h1 id="addLapTitle">Add lap times:</h1>
                        {/* <div className="liveLapClosed">
                            <button onClick={this.toggleLiveTimer}>Live Lap Times</button>
                            <StopWatch />
                        </div> */}
                        <h1>Lap by Lap:</h1>
                        <input placeholder="Enter lap time. Ex) 1:25.288" onChange={this.handleChange} value={this.state.lap} id="addLapInput"></input>
                    </form>
                        <Link to="/Races">
                            <button id="addRaceButton">Add race</button>
                        </Link>
                   </div> 
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