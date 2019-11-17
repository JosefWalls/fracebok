import React from 'react';
import {Link} from 'react-router-dom'
import {getUserPhotos} from "./../daffy_duck/photoReducer"
import {connect} from 'react-redux'
import "./sass/photo.css"

class Photos extends React.Component {
    constructor(){
        super()
        
    this.state = {
        car_id: 0,
        toggleMenu: "menuClosed",
        toggleIcon: "toggleMenuOn"
      };
    }

    componentDidMount = async() => {
        await this.props.getUserPhotos()
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
    

    render(){
        console.log(this.props.userImages && this.props.userImages)
        const mappedImages = this.props.userImages && this.props.userImages.map((val, i) => {
            return (
                <div className="mapped">
                    <Link to={`/Viewphoto/${val.photo_id}`}>
                    <img className="carImage" src={val.link}></img>
                    </Link>
                    <h4>{val.title}</h4>
                </div>
            )
        })
        return (
            <div className="main">
            <div className="header">
                <p id="logo">Fracebok</p>
            </div>
            <div className="carCards">
            <h1 id="garageTitle">Photo Gallery</h1>
            <div className="flyout">
             <div className={this.state.toggleMenu}>
             <img onClick={this.handleClick} id={this.state.toggleIcon} src="https://icon-library.net/images/menu-icon-white-png/menu-icon-white-png-27.jpg"></img>
                <Link to="/Addphoto">
                    <button id="button3">Add a Photo </button>
                </Link>
                <Link to="/Profile">
                    <button id="button2">Back to Profile</button>
                </Link>
            </div>
          </div>
                <div className="garage">
                {mappedImages}
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        userImages: reduxState.PhotoReducer.userImages
    }
}

export default connect(mapStateToProps, {getUserPhotos})(Photos)