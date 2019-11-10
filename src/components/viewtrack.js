import React from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'
import {getTrackSessions, updateState} from "./../daffy_duck/raceReducer"
import {connect} from 'react-redux'

class Viewtrack extends React.Component {
    constructor(){
        super()



        this.state = {
            
        }
    }

    componentDidMount(){
        this.props.getTrackSessions(this.props.match.params.track_id)
    }

    render(){
        let mappedSessions = this.props.trackSessions.map((val, i)=> {
            return (
                <div className="mapped">
                    <p>{val.make}</p>
                    <img src={val.header} className="carImage"></img>
                    <Link to={`/Viewsession/${val.session_id}`}>
                        <button>View session</button>
                    </Link>
                    
                </div>
            )
        })
        return (
            <div className="cards">
                <h1>View track</h1>
                <Link to="/Races">
                    <button>Back to all tracks</button>
                </Link>
                {mappedSessions}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        trackSessions: reduxState.RaceReducer.trackSessions
    }
}

export default connect(mapStateToProps, {getTrackSessions})(Viewtrack)