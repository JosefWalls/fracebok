import React from 'react';
import {connect} from 'react-redux'
import {Link} from "react-router-dom"
import {viewImage} from "./../daffy_duck/photoReducer"
import {storage} from './../firebase-config'
import Axios from "axios"

class EditPhoto extends React.Component {
    constructor(){
        super()

        this.state = {
            newLink: "",
            newDesc: "",
            newTitle: "",
            image: []
        }
    }

    componentDidMount = () => {
        this.props.viewImage(this.props.match.params)
        for(let i = 0; i <  this.props.image.length; i++){
            if(this.props.image[i].link.length > 0){
                this.setState({newLink: this.props.image[i].link})
            } else if (this.props.image[i].description.length > 0){
                this.setState ({newDesc: this.props.image[i].description})
            } else if (this.props.image[i].title.length > 0){
                this.setState({newTitle: this.props.image[i].title})
            } else {
                return "Henlao"
            }
        }
    }

    handlePicture = (e) => {
        console.log(this.state)
        if(e.target.files[0]){
            const image = (e.target.files[0])
            const uploadTask = storage.ref(`/photo_gallery/${image.name}`).put(image)
            uploadTask.on("state_changed", 
            () => {
                storage.ref('photo_gallery').child(image).getDownloadURL()
                .then(url => {
                    this.setState({newLink: url})
                })
            }
            )
        }
    }

    handleDesc = (e) => {
        this.setState({newDesc: e.target.value})
    }

    handleTitle = (e) => {
        this.setState({newTitle: e.target.value})
    }

    handleSubmit = () => {
    const photo_id = this.props.match.params.photo_id
    Axios.post(`/photos/EditPhoto/${photo_id}`, {
        link: this.state.newLink,
        description: this.state.description,
        title: this.state.title
    })
    .then (() => {
        this.props.history.push("/Photos")
    })
    }

    render(){
        return (
            <div className="main">
                <div>
                <div className="header">
                    <p id="logo">Fracebok</p>
                </div>
                <div className="editProfileCard">
                <p className="editTitle">Edit Photo</p>
                <input type="file" onChange={this.handlePicture}></input>
                <input placeholder="Update Description" onChange={this.handleDesc}></input>
                <input placeholder="Update Title" onChange={this.handleTitle}></input>
                <button onSubmit={this.handleSubmit}>Submit Updates</button>
                <Link to="/Photos">
                <button>Cancel</button>
                </Link>
                </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        image: reduxState.PhotoReducer.image
    }
}


export default connect(mapStateToProps,  {viewImage})(EditPhoto);