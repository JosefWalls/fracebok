import React from "react";
import {Link} from "react-router-dom"
import {connect} from 'react-redux';
import {viewImage, deletePhoto} from "./../daffy_duck/photoReducer"
import {getPhotoComments, updateState} from "./../daffy_duck/commentReducer"
import AddComment from "./addComment";
import axios from "axios";
import "./scss/photo.css";
import "./scss/comments.css"

class ViewPhoto extends React.Component {
    constructor(){
        super()

        this.state = {
            toggleMenu: "menuClosed",
            toggleIcon: "toggleMenuOn"
          };
        
    }

    componentDidMount () {
        const photo_id = this.props.match.params.photo_id
        this.props.getPhotoComments(photo_id)
        this.props.viewImage(photo_id)
    }

    handleClick = () => {
        if(this.state.toggleMenu === "menuClosed"){
            this.setState({toggleMenu: "menuOpen"})
            this.setState({toggleIcon: "toggleMenuOff"})
        } else {
            this.setState({toggleMenu: "menuClosed"})
            this.setState({toggleIcon: "toggleMenuOn"})
        }
      }
    
    handleDelete = async () => {
        await this.props.deletePhoto(this.props.match.params.photo_id)
                this.props.history.push("/Photos")
    }

    commentBody = (e) => {
        this.props.updateState({[e.target.name]: e.target.value})
    }

    postComment = () => {
        axios.post(`/Comment/Add/Photo/${this.props.match.params.photo_id}`, {
            body: this.props.comment
        })
        .then(() => {
            window.location.reload()
        })
        .catch(error => {
            console.log(error)
        })
    }

    render(){
        const mappedImage = this.props.image.map((val, i) => {
            return (
                <div className="viewImage">
                    <img className="photoImage" src={val.link}></img>
                    <h2>{val.title}</h2>
                    <p>{val.description}</p>
                </div>
            )
        });
        const mappedComments = this.props.photoComments.map((val, i) => {
            return (
                <div className="commentCard">
                    <h1>{val.username}</h1>
                    <p className="commentDate">posted on {val.date}</p>
                    <p id="commentBody">{val.body}</p>
                </div>
            )
        })
        return (
            <div className="main">
            <div className="header">
                <Link to="/Profile">
                    <p id="logo">Fracebok</p>
                </Link>
            </div>
            <div className="userPhotoCard">
            <div className="userPhoto">
                {mappedImage}
            </div>
            <div className="comments">
                {mappedComments}
                <input type="text" placeholder="Add Comment" name="comment" onChange={this.commentBody}></input>
                <button onClick={this.postComment}>Add Comment</button>
            </div>
            </div>
            </div>

        )
    }
}

const mapStateToProps = reduxState => {
    return {
        image: reduxState.PhotoReducer.image,
        photoComments: reduxState.CommentReducer.photoComments,
        comment: reduxState.CommentReducer.comment
    }
}

export default connect(mapStateToProps, {viewImage, deletePhoto,getPhotoComments, updateState})(ViewPhoto);