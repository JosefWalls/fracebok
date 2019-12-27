import React, { Component } from 'react'
import {connect} from "react-redux";
import {Link} from "react-router-dom"
import {trackSessions} from "./../../daffy_duck/exploreReducer"

class userTrackSessions extends Component {
    constructor(){
        super()
    }

    componentDidMount(){
        this.props.trackSessions(this.props.match.params.user_id, this.props.match.params.track_id)
    }

    render() {
        const mappedSessiosns = this.props.userTrackSessions.map((val, i) => {
            return (
                <div className="mapped">
                    <p>{val.year} {val.make} {val.model}</p>
                    <img src={val.image} className="carImage"></img>
                    <Link to={`/Explore/User/Session/${val.session_id}`}>
                        <button>View Session</button>
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
                <div className="mappedTrackCard">
                    <div className="mappedTrackSessions">
                        {mappedSessiosns}
                </div>
                </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        userTrackSessions: reduxState.ExploreReducer.userTrackSessions 
    }
}

export default connect(mapStateToProps, {trackSessions})(userTrackSessions);