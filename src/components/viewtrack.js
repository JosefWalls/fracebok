import React from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'
import {getTrackSessions, updateState, deleteTrack} from "./../daffy_duck/raceReducer"
import {connect} from 'react-redux'
import "./sass/viewtrack.css";
class Viewtrack extends React.Component {
    constructor(){
        super()



        this.state = {
            toggleMenu: "menuClosed",
            toggleIcon: "toggleMenuOn"
        }
    }

    componentDidMount(){
        this.props.getTrackSessions(this.props.match.params.track_id)
    }

    handleDelete = async() => {
        await this.props.deleteTrack(this.props.match.params.track_id)
        this.props.history.push("/Races")
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
        let mappedSessions = this.props.trackSessions.map((val, i)=> {
            return (
                <div className="mapped">
                        <p>{val.year} {val.make} {val.model}</p>
                    <img src={val.header} className="carImage"></img>
                    <Link to={`/Viewsession/${val.session_id}`}>
                        <button>View session</button>
                    </Link>
                    
                </div>
            )
        })
        return (
            <div className="main">
                <div className="header">
                    <p id="logo">Fracebok</p>
                </div>
                <div className="carCards">
                <h1 id="registerTitle">View track</h1>
                <div className="mappedTrackCard">
                    <div className="mappedTrackSessions">
                        {mappedSessions}
                </div>
                </div>
                <div className="garageFlyout">
                    <div className={this.state.toggleMenu}>
                    <img onClick={this.handleClick} id={this.state.toggleIcon} src="https://icon-library.net/images/menu-icon-white-png/menu-icon-white-png-27.jpg"></img>
                <Link to="/Races">
                    <button id="button1">Back to all tracks</button>
                </Link>
                <Link to={`/Edittrack/${this.props.match.params.track_id}`}>
                    <button id="button2">Edit Track</button>
                </Link>
                <button onClick={this.handleDelete} id="button3">Delete Track</button>
                </div>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        trackSessions: reduxState.RaceReducer.trackSessions
    }
}

export default connect(mapStateToProps, {getTrackSessions, deleteTrack})(Viewtrack)

