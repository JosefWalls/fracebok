import React from 'react';
import {Link} from 'react-router-dom';
import {storage} from "../firebase-config";
import {connect} from 'react-redux'
import {updateState} from "../daffy_duck/photoReducer"
import axios from "axios"

class AddPhotos extends React.Component {
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
            const video = (e.target.files[0])
            const uploadTask = storage.ref(`/videos/${video.name}`).put(video)
            uploadTask.on("state_changed", 
            () => {
                storage.ref('videos').child(video.name).getDownloadURL()
                .then(url => {
                    this.setState({link: url})
                })
            }
            )
        }
     }

    handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post("/Vidoes/Add", {
            link: this.state.link,
            description: this.state.description,
            title: this.state.title
        })
        .then(res => {
            this.props.history.push("/Videos")
            console.log(res)
        })
    }

   render(){
       return (
           <div className="main">
               <div className="header">
                    <p id="logo">Fracebok</p>
                </div>
                <form className="addCarCard">
               <input placeholder="Enter Title" name="title" onChange={this.handleTitle}></input>
               <input placeholder="Enter Description" name="description" onChange={this.handleDescription}></input>
               <input type="file" onChange={this.handlePhoto}></input>
               <button onClick={this.handleSubmit}>Submit Video</button>
               <Link to="/Photos">
                    <button>Cancel</button>
                </Link>
                </form>
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


export default connect(mapStateToProps, {updateState})(AddPhotos)
