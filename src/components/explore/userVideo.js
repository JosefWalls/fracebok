import React from "react";
import {Link} from "react-router-dom"
import {connect} from 'react-redux';
import {getVideo} from "./../../daffy_duck/exploreReducer"
import "./../sass/viewphoto.css"


class ViewVideo extends React.Component {
    constructor(){
        super()

        this.state = {
            toggleMenu: "menuClosed",
            toggleIcon: "toggleMenuOn"
          };
        
    }

    componentDidMount = async () => {
        const video_id = this.props.match.params.video_id
        await this.props.getVideo(video_id)
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
        console.log(this.props.userVideo && this.props.userVideo)
        const mappedVideo = this.props.userVideo && this.props.userVideo.map((val, i) => {
            return (
                <div className="viewImage">
                    <h2>{val.title}</h2>
                    <iframe className="video" src={val.link}></iframe>
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
                {mappedVideo}
            </div>
            <div className={this.state.toggleMenu}>
             <img onClick={this.handleClick} id={this.state.toggleIcon} src="https://icon-library.net/images/menu-icon-white-png/menu-icon-white-png-27.jpg"></img>
                <Link to="/Videos">
                    <button id="button1">Back to Videos</button>
                </Link>
            </div>
            </div>
            </div>

        )
    }
}

const mapStateToProps = reduxState => {
    return {
        userVideo: reduxState.ExploreReducer.userVideo
    }
}

export default connect(mapStateToProps, {getVideo})(ViewVideo);