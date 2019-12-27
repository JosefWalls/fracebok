import React from "react";
import {Link} from "react-router-dom"
import {connect} from 'react-redux';
import {getVideo, deleteVideo} from "./../daffy_duck/videoReducer"


class ViewVideo extends React.Component {
    constructor(){
        super()

        this.state = {
            toggleMenu: "menuClosed",
            toggleIcon: "toggleMenuOn"
          };
        
    }

    componentDidMount () {
        const video_id = this.props.match.params.video_id
        this.props.getVideo(video_id)
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
        await this.props.deleteVideo(this.props.match.params.video_id)
        this.props.history.push("/Videos")
    }

    render(){
        const mappedImage = this.props.video.map((val, i) => {
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
                {mappedImage}
            </div>
             <div className="flyout">
                <Link to="/Videos">
                    <button>Back to Videos</button>
                </Link>
                <button onClick={this.handleDelete} id="button2">Delete Video</button>
            </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        video: reduxState.VideoReducer.video
    }
}

export default connect(mapStateToProps, {getVideo, deleteVideo})(ViewVideo);