import React from "react";
import {Link} from "react-router-dom"
import {connect} from 'react-redux';
import {viewImage, deletePhoto} from "./../daffy_duck/photoReducer"
import AddComment from "./addComment";
import "./scss/photo.css"

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

    render(){
        const mappedImage = this.props.image.map((val, i) => {
            return (
                <div className="viewImage">
                    <img className="photoImage" src={val.link}></img>
                    <h2>{val.title}</h2>
                    <p>{val.description}</p>
                </div>
            )
        })
        return (
            <div className="main">
            <div className="header">
                <p id="logo">Fracebok</p>
            </div>
            <div className="userPhotoCard">
            <div className="userPhoto">
                {mappedImage}
            </div>
            <div>
                <input type="text" placeholder="Add Comment"></input>
                <button>Add Comment</button>
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

export default connect(mapStateToProps, {viewImage, deletePhoto})(ViewPhoto);