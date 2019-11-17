import React from 'react';
import {connect} from 'react-redux'
import {Link} from "react-router-dom"
import {viewImage} from "./../daffy_duck/photoReducer"
import {storage} from './../firebase-config'

class EditPhoto extends React.Component {
    constructor(){
        super()

        this.state = {
            image: {}
        }
    }

    componentDidMount = () => {
        this.props.viewImage(this.props.match.params)
        for(let i = 0; i <  this.props.image.length; i++){
            this.setState({image: this.props.image[i]})
        }
    }

    handlePicture = (e) => {
        if(e.target.fies[0]){
            const image = (e.target.files[0])
            const uploadTask = storage.ref(`/photo_gallery/${image.name}`).put(image)
            uploadTask.on("state_changed", 
            () => {
                storage.ref('photo_gallery').child(image).getDownloadURL()
                .then(url => {
                    this.setState({[..image]: url})
                })
            }
            )
        }
    }

    render(){
        return (
            <div>
                <h1>Edit Photo</h1>
                <input type="file"></input>
                <input placeholder="Update Description"></input>
                <input placeholder="Update Title"></input>
                <button>Submit Updates</button>
                <button>Cancel</button>C
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