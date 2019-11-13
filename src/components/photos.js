import React from 'react';
import {Link} from 'react-router-dom';
import {storage} from "./../firebase-config";
import {connect} from 'react-redux'
import {updateState} from "./../daffy_duck/photoReducer"
import axios from "axios"

class Photos extends React.Component {
    constructor(){
        super()
        this.setState({
            link: "",
            description: "",
            title: ""
        })
       
    }


    componentDidMount(){
    }

    handleTitle = (e) => {
        this.setState({title: e.target.value})
    }

    handleDescription = (e) => {
        this.setState({description: e.target.value})
    }

    handlePhoto = (e) => {
        if(e.target.files[0]){
            const image = (e.target.files[0])
            const uploadTask = storage.ref(`/photo_gallery/${image.name}`).put(image)
            uploadTask.on("state_changed", 
            () => {
                storage.ref('photo_gallery').child(image.name).getDownloadURL()
                .then(url => {
                    this.setState({link: url})
                })
            }
            )
        }
     }

    handleSubmit = (e) => {
        console.log(this.state)
        e.preventDefault()

        axios.post("/photos/addImage", {
            link: this.state.link,
            description: this.state.description,
            title: this.state.title
        })
    }

   render(){
       return (
           <div className="main">
               <input placeholder="Enter Title" name="title" onChange={this.handleTitle}></input>
               <input placeholder="Enter Description" name="description" onChange={this.handleDescription}></input>
               <input type="file" onChange={this.handlePhoto}></input>
               <button onClick={this.handleSubmit}>Submit Photo</button>
           </div>
       )
   }
}

const mapStateToProps = reduxState => {
    return {
        title: reduxState.PhotoReducer.title,
        description: reduxState.PhotoReducer.description,
        track: reduxState.PhotoReducer.track,
        session_id: reduxState.PhotoReducer.session_id
    }
}


export default connect(mapStateToProps, {updateState})(Photos)
