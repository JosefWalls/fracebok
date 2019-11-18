import React from 'react'
import {Link} from 'react-router-dom'
import {logoutUser} from "./../daffy_duck/loginRegisterReducer"
import {connect} from "react-redux"
import {retrieveInfo} from "./../daffy_duck/profileReducer"
import "./sass/profile.css"
class Profile extends React.Component {
    constructor(){
        super()
        
    }

    componentDidMount = () => {
        this.props.retrieveInfo();
    }

    handleLogout = () => {
        this.props.logoutUser()
        .then(() => {
            this.props.history.push("/")
        })
    }

    handleEditClick = () => {
        // console.log(this.props.user)
    }

    render(){
        return (
            <div className="main">
                <div className="header">
                    <p id="logo">Fracebok</p>
                </div>
                <p onClick={this.handleLogout} className="logooutButton">Log Out</p>
             <div className="userInfoCard">
                <header className="profilePictures">
                    <img src={this.props.user[0] && this.props.user[0].header} className="profileheader"></img>
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
                            <p className="profileCardHeaders">Photo Gallery</p>
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
                </div>
              </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        user: reduxState.ProfileReducer.user
    }
}

export default connect(mapStateToProps, {logoutUser, retrieveInfo})(Profile);