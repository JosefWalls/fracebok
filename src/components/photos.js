import React from 'react';
import {Link} from 'react-router-dom';
import {storage} from "./../firebase-config";
import {connect} from 'react-redux'
import {updatePicture} from "./../daffy_duck/photoReducer"

class Photos extends React.Component {
    constructor(){
        super()

        this.state = {
            picture: "",
            description: ""
        }
    }

    handleImage = (e) => {
        if(e.target.files[0]){
            const image = e.target.files[0]
            const uploadTask = storage.ref(`photo_gallery/${image.name}`).put(image)
            uploadTask.on("state_changed",
            () => {
                storage.ref('photo_gallery').child(image.name).getDownloadURL
                .then(url => {
                    this.setState({picture: url})
                })
            })
        }
    }

    handleDescription = (e) => {
        this.setState({description: e.target.value})
    }

    handleSubmit = () => {
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <h1>Photos</h1>
                <Link to="/Profile">
                    <button>Back to Profile</button>
                </Link>
                <div>
                <button>Add Image</button>
                    <input placeholder="Enter Description" type="text" onChange={this.handleDescription} name="description"></input>
                    <input placeholder="Enter Title" type="text" onChange={this.handleDescription} name="title"></input>
                    <input placeholder="Enter Images" type="file" onChange={this.handleImage}></input>
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        picture: reduxState.PhotoReducer.picture,
        description: reduxState.PhotoReducer.description
    }
}


export default connect(mapStateToProps, {updatePicture})(Photos)
