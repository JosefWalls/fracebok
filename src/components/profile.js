import React from 'react'
import {Link} from 'react-router-dom'
import {logoutUser} from "./../daffy_duck/loginRegisterReducer"
import {connect} from "react-redux"
import {retrieveInfo} from "./../daffy_duck/profileReducer"
import {getPhotoNotifications, updateState, getRaceNotificatins} from "./../daffy_duck/notificationsReducer"
import "./scss/profile.css"

class Profile extends React.Component {
    constructor(){
        super()

        this.state = {
            notificationBar: "notificationBarClosed"
        }
        
    }

    componentDidMount = async () => {
        await this.props.retrieveInfo();
        await this.props.getPhotoNotifications();
        await this.props.getRaceNotificatins();
        this.props.updateState({numberOfPhotoNotifications: this.props.photoNotifications.length});
        this.props.updateState({numberOfRaceNotifications: this.props.raceNotifications.length})
    }

    handleLogout = () => {
        this.props.logoutUser()
        .then(() => {
            this.props.history.push("/")
        })
    }

    changeNotificationBar = () => {
        if(this.state.notificationBar === "notificationBarClosed"){
            this.setState({notificationBar: "notificationBarOpen"})
        } else {
            this.setState({notificationBar: "notificationBarClosed"})
        }
    }

    render(){
        return (
            <div className="main">
                <div className="header">
                    <p id="logo">Fracebok</p>
                </div>
                <div className="notificationBar">
                    <h1 onClick={this.changeNotificationBar}>Notifications</h1>
                    <div className={this.state.notificationBar}>
                            <p>You have <span>{this.props.numberOfPhotoNotifications}</span> new comments on your Photos!</p>
                            <Link to="/Notifications/Photos">
                                <button>View Photo Notifications</button>
                            </Link>
                            <p>You have <span>{this.props.numberOfRaceNotifications}</span> new comments on your Races!</p>
                            <Link to="/Notifications/Races">
                                <button>View Race Notifications</button>
                            </Link>
                    </div>
                </div>
             <div className="userInfoCard">
                <header className="profilePictures">
                    <img src={this.props.user[0] && this.props.user[0].header} className="profileheader" alt="When registers, if no header is input, add a default in place"></img>
                    <div className="username">
                        <img src={this.props.user[0] && this.props.user[0].profile} className="profile"></img> 
                        <h1 id="userUsername">{this.props.user[0] && this.props.user[0].username}</h1>
                    </div>
                </header>
                <div className="profileCards">
                    <Link to={`/Editprofile/${this.props.user_id}`}>
                        <div className="buttonCard">
                            <p className="profileCardHeaders">Edit Profile</p>=
                        </div>
                    </Link>
                    <Link to="/Garage">
                    <div className="buttonCard">
                            <p className="profileCardHeaders">Garage</p>
                        </div>
                    </Link>
                    <Link to="/Races">
                    <div className="buttonCard">
                            <p className="profileCardHeaders">Races</p>
                        </div>
                    </Link>
                    <Link to="/Photos">
                    <div className="buttonCard">
                            <p className="profileCardHeaders">Photos</p>
                        </div>
                    </Link>
                    <Link to="/Explore/Home">
                    <div className="buttonCard">
                            <p className="profileCardHeaders">Explore</p>
                        </div>
                    </Link>
                    <Link to="/Friends">
                    <div className="buttonCard">
                            <p className="profileCardHeaders">Friends</p>
                        </div>
                    </Link>
                    <Link to="/Videos">
                    <div className="buttonCard">
                            <p className="profileCardHeaders">Videos</p>
                        </div>
                    </Link>
                </div>
                <p>Render all comments based on user id</p>
              </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        user: reduxState.ProfileReducer.user,
        photoNotifications: reduxState.NotificationReducer.photoNotifications,
        numberOfPhotoNotifications: reduxState.NotificationReducer.numberOfPhotoNotifications,
        raceNotifications: reduxState.NotificationReducer.raceNotifications,
        numberOfRaceNotifications: reduxState.NotificationReducer.numberOfRaceNotifications
    }
}

export default connect(mapStateToProps, {logoutUser, retrieveInfo, getPhotoNotifications, updateState, getRaceNotificatins})(Profile);