import React from 'react';
import {Link} from 'react-router-dom'
import {getUserPhotos} from "./../daffy_duck/photoReducer"
import {connect} from 'react-redux'
import "./scss/viewPhoto.css"

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
                <p id="logo">Fracetagram</p>
            </div>
            <div className="flyout">
                <Link to="/Addphoto">
                    <button>Add a Photo</button>
                </Link>
            </div>
            <div className="carCards">
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