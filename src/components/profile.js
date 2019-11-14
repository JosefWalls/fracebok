import React from 'react'
import {Link} from 'react-router-dom'
import {logoutUser} from "./../daffy_duck/loginRegisterReducer"
import {connect} from "react-redux"
import {retrieveInfo} from "./../daffy_duck/profileReducer"

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
                <button onClick={this.handleLogout}>Log Out</button>
                <header className="something">
                    <div className="username">
                        <img src={this.props.user[0] && this.props.user[0].profile} className="profile"></img> 
                        <h1>{this.props.user[0] && this.props.user[0].username}</h1>
                    </div>
                    <img src={this.props.user[0] && this.props.user[0].header} className="header"></img>
                </header>
                <div className="profileCards">
                    <Link to={`/Editprofile/${this.props.user_id}`}>
                        <button onClick={this.handleEditClick}>Edit Profile</button>
                    </Link>
                    <Link to="/Garage">
                        <button>Garage</button>
                    </Link>
                    <Link to="/Races">
                        <button>Races</button>
                    </Link>
                    <Link to="/Photos">
                        <button>Photo Gallery</button>
                    </Link>
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