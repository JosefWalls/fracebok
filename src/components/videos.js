import React from 'react';
import {Link} from 'react-router-dom'
import {getVideos} from "./../daffy_duck/videoReducer"
import {connect} from 'react-redux'
import "./scss/videos.css"

class Photos extends React.Component {
    constructor(){
        super()
        
    this.state = {
        toggleMenu: "menuClosed",
        toggleIcon: "toggleMenuOn"
      };
    }

    componentDidMount = async() => {
        await this.props.getVideos()
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
        const mappedVideos = this.props.videos && this.props.videos.map((val, i) => {
            return (
                <div className="mappedCars">
                    <Link to={`/Video/${val.video_id}`}>
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
            <div className="flyout">
                <button>Add a Video</button>
            </div>
            <div className="carCards">
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
        videos: reduxState.VideoReducer.videos
    }
}

export default connect(mapStateToProps, {getVideos})(Photos)