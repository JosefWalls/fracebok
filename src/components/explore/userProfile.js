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
            <div className="userInfoCard">
                <header className="profilePictures">
                    <img src={val.profile} className="profile"></img>
                    <img src={val.header} className="profileheader"></img>
                    <div className="username">
                        <h1 id="userUsername">{val.username}</h1>
                    </div>
                </header>
                <div className="profileCards">
                <div className="buttonCard">
                    <p onClick={this.addFriend} className="profileCardHeaders">Add As Friend</p>
                </div>
                <div className="buttonCard">
                    <Link to={`/Explore/UserGarage/${val.user_id}`}>
                        <p className="profileCardHeaders">Garage</p>
                    </Link>
                </div>
                <div className="buttonCard">
                    <Link to={`/Explore/UserTracks/${val.user_id}`}>
                        <p className="profileCardHeaders">Races</p>
                    </Link>
                </div>
                <div className="buttonCard">
                    <Link to={`/Explore/UserPhotos/${val.user_id}`}>
                        <p className="profileCardHeaders">Photos</p>
                    </Link>
                </div>
                {/* <div className="buttonCard">
                    <Link to={`/Explore/UserPhotos/${val.user_id}`}>
                        <p className="profileCardHeaders">Friends</p>
                    </Link>
                </div> */}
                <div className="buttonCard">
                    <Link to={`/Explore/UserVideos/${val.user_id}`}>
                        <p className="profileCardHeaders">Videos</p>
                    </Link>
                </div>
                </div>
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