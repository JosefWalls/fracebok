import React from "react";
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {getUserProfile} from "./../../daffy_duck/exploreReducer"
import axios from 'axios'

class UserProfile extends React.Component {
    constructor(){
        super()
    }

    componentDidMount(){
        this.props.getUserProfile(this.props.match.params.user_id)
    }

    addFriend = (e) => {
        e.preventDefault()
        const friend_id = this.props.match.params.user_id
        axios.post(`/Explore/AddFriend/${friend_id}`, {
            friend_id: friend_id
        })
        .then(() => {
            alert("Added Friend")
        })
    }

    render(){
    const mappedUserProfile = this.props.userProfile.map((val, i) => {
        return (
            <div className>
                <h1>{val.username}</h1>
                <button onClick={this.addFriend}>Add As Friend</button>
                <img src={val.profile}></img>
                <img src={val.header}></img>
                <Link to={`/Explore/UserGarage/${val.user_id}`}>
                    <button>Garage</button>
                </Link>
            </div>
        )
    })
        return (
            <div className="main">
            <div className="header">
                <p id="logo">Fracebok</p>
            </div>
            {mappedUserProfile}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        userProfile: reduxState.ExploreReducer.userProfile
    }
}

export default connect(mapStateToProps, {getUserProfile})(UserProfile);