import React from "react"
import {updateState, deleteProfile} from "./../daffy_duck/profileReducer"
import {Link} from 'react-router-dom'
import {storage} from "./../firebase-config"
import {connect} from 'react-redux'
import Axios from 'axios'

class EditProfile extends React.Component{
    constructor(){
        super()

    }


    componentDidMount(){
        this.props.updateState({firstname: this.props.user[0] && this.props.user[0].firstname})
        this.props.updateState({username: this.props.user[0] && this.props.user[0].username})
        this.props.updateState({profile: this.props.user[0] && this.props.user[0].profile})
        this.props.updateState({profile: this.props.user[0] && this.props.user[0].profile})
    }

    handleChange = (e) => {
        this.props.updateState({[e.target.name]: e.target.value})
        console.log(this.props.username)
    }

    handleProfile = (e) => {
        if(e.target.files[0]){
            const image = (e.target.files[0])
            const uploadTask = storage.ref(`profile/${image.name}`).put(image);
            uploadTask.on("state_changed", 
            () => {
                storage.ref('profile').child(image.name).getDownloadURL()
                .then(url => {
                    this.props.updateState({profile: url})
                })
            }
            )
        }
    }

    handleHeader = (e) => {
        if(e.target.files[0]){
            const image = (e.target.files[0])
            const uploadTask = storage.ref(`header/${image.name}`).put(image);
            uploadTask.on("state_changed", 
            () => {
                storage.ref('header').child(image.name).getDownloadURL()
                .then(url => {
                    this.props.updateState({header: url})
                })
            }
            )
        }
    }

    handleDelete = async () => {
       await this.props.deleteProfile()
             this.props.history.push("/")
    }

    handleSubmit = (e) => {
        e.preventDefault()
        Axios.put("/api/Editprofile", {
            username: this.props.username,
            firstname: this.props.firstname,
            profile: this.props.profile,
            header: this.props.header
        })
        .then(() => {
            this.props.history.push("/Profile")
        })
    }

    render(){
        return (
            <div>
                <p>Edit Profile</p>
                <input placeholder="Update Name" onChange={this.handleChange} name="username"></input>
                <input placeholder="Update First Name" onChange={this.handleChange} name="firstname"></input>
                <input type="file" placeholder="Update Profile" onChange={this.handleProfile}></input>
                <input type="file" placeholder="Update Header" onChange={this.handleHeader}></input>
                <button onClick={this.handleDelete}>DELETE PROFILE</button>
                <button onClick={this.handleSubmit}>Submit Updates</button>
                <Link to="/Profile">
                <button>Cancel</button>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        username: reduxState.ProfileReducer.username,
        firstname: reduxState.ProfileReducer.firstname,
        profile: reduxState.ProfileReducer.profile,
        header: reduxState.ProfileReducer.header,
        user: reduxState.ProfileReducer.user
    }
}

export default connect(mapStateToProps, {updateState, deleteProfile})(EditProfile);