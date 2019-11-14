import React from 'react';
import {updateState} from "./../daffy_duck/loginRegisterReducer"
import {connect} from 'react-redux'
import axios from 'axios'
import {storage} from "./../firebase-config";
import fileUploader from "react-firebase-file-uploader"
import firebase from "firebase";
import {Link} from 'react-router-dom'
import "./sass/register.css"

class Register extends React.Component {

        state = {
            error: false,
            profile: "",
            profileUrl: "",
            header: "",
            headerUrl: ""
        }
    

    handleChange = e => {
        this.props.updateState({[e.target.name]: e.target.value})
    }

    handleClick = e => {
        e.preventDefault();
        axios.post("/auth/register", {
            username: this.props.username,
            password: this.props.password,
            firstname: this.props.firstname,
            profile: this.state.profileUrl,
            header: this.state.headerUrl
        })
        .then(() => {
            this.props.history.push("/")
            console.log(this.state.headerUrl)
        })
        .catch(error => {
            this.setState({error: true})
        })
    }

    handleProfileUpload = (e) => {
        if(e.target.files[0]){ //make sure there is an actual image
            const image = (e.target.files[0])
            const uploadTask = storage.ref(`profile/${image.name}`).put(image)
            uploadTask.on("state_changed",
            () => {
                storage.ref('profile').child(image.name).getDownloadURL()
                .then(url => {
                    this.setState({profileUrl: url})
                })
            }
            )
        }
    }

    handleHeaderUpload = (e) => {
        if(e.target.files[0]){ //make sure there is an actual image
            const image = (e.target.files[0])
            const uploadTask = storage.ref(`header/${image.name}`).put(image)
            uploadTask.on("state_changed",
            () => {
                storage.ref('header').child(image.name).getDownloadURL()
                .then(url => {
                    this.setState({headerUrl: url})
                })
            }
            )
        }
    }

    render(){
        // console.log(this.state)
        return(
            <div className="main">
                <div className="header">
                    <p id="logo">Fracebok</p>
                </div>
                <h1 id="registerTitle">Register</h1>
            <div className="registerBox">
                <div className="registerInputs">
                    <input placeholder="Enter Username" name="username" onChange={this.handleChange}></input>
                    <input placeholder="Enter Password" name="password" onChange={this.handleChange}></input>
                    <input placeholder="Enter First Name" name="firstname" onChange={this.handleChange}></input>
                    <p className="uploadTitles">Upload Profile Image</p>
                    <input type="file" onChange={this.handleProfileUpload} placeholder="Enter Profile"></input>
                    <p className="uploadTitles">Upload Header Image</p>
                    <input type="file" onChange={this.handleHeaderUpload} placeholder="Enter Header"></input>
                    <button onClick={this.handleClick}>Register</button>
                    <Link to="/">
                        <button>Cancel</button>
                    </Link>
                    {this.state.error === true ? <h1>The username you entered is not available</h1> : null}
                </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState =>{
    return {
        username: reduxState.loginRegisterReducer.username,
        password: reduxState.loginRegisterReducer.password,
        firstname: reduxState.loginRegisterReducer.firstname,
        profile: reduxState.loginRegisterReducer.profile,
        header: reduxState.loginRegisterReducer.header
    }
}

export default connect(mapStateToProps, {updateState})(Register);