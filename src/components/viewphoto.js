import React from "react";
import {Link} from "react-router-dom"
import {connect} from 'react-redux';
import {viewImage, deletePhoto} from "./../daffy_duck/photoReducer"
import "./sass/viewphoto.css"


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
                    <img className="carImage" src={val.link}></img>
                    <h2>{val.title}</h2>
                    <p>{val.description}</p>
                </div>
            )
        })
        console.log(this.props.image)
        return (
            <div className="main">
            <div className="header">
                <p id="logo">Fracebok</p>
            </div>
            <div className="userPhotoCard">
            <div className="userPhoto">
                {mappedImage}
            </div>
            <div className={this.state.toggleMenu}>
             <img onClick={this.handleClick} id={this.state.toggleIcon} src="https://icon-library.net/images/menu-icon-white-png/menu-icon-white-png-27.jpg"></img>
                <Link to="/Photos">
                    <button>Back to Images</button>
                </Link>
                <button onClick={this.handleDelete}>Delete Image</button>
                <Link to={`/EditPhoto/${this.props.match.params.photo_id}`}>
                    <button>Edit Image</button>
                </Link>
                <button>Download Image</button>
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