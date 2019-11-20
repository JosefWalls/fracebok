import React from 'react';
import {Link} from 'react-router-dom'
import {getUserVideos} from "./../../daffy_duck/exploreReducer"
import {connect} from 'react-redux'
import "./sass/userVideos.css"

class Photos extends React.Component {
    constructor(){
        super()
        
    this.state = {
        toggleMenu: "menuClosed",
        toggleIcon: "toggleMenuOn"
      };
    }

    componentDidMount = async() => {
        await this.props.getUserVideos(this.props.match.params.user_id)
        console.log(this.props.match.params.user_id)
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
        // console.log(this.props.userVideos && this.props.user_id//)
        const mappedVideos = this.props.userVideos && this.props.userVideos.map((val, i) => {
            return (
                <div className="mappedCars">
                    <Link to={`/Explore/UserVideo/${val.video_id}`}>
                    <button>View Video</button>
                    </Link>
                    <h4>{val.title}</h4>
                    <p>{val.description}</p>
                </div>
            )
        })
        return (
            <div className="main">
            <div className="header">
                <p id="logo">FraceaYou</p>
            </div>
            <div className="carCards">
            <h1 id="garageTitle">Video Gallery</h1>
            <div className="flyout">
             <div className={this.state.toggleMenu}>
             <img onClick={this.handleClick} id={this.state.toggleIcon} src="https://icon-library.net/images/menu-icon-white-png/menu-icon-white-png-27.jpg"></img>
                <Link to="/AddVideo">
                    <button id="button3">Add a Video</button>
                </Link>
                <Link to="/Profile">
                    <button id="button2">Back to Profile</button>
                </Link>
            </div>
          </div>
                <div className="garage">
                    {mappedVideos}
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        userVideos: reduxState.ExploreReducer.userVideos
    }
}

export default connect(mapStateToProps, {getUserVideos})(Photos)