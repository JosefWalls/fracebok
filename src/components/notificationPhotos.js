import React from "react";
import {getPhotoNotifications, updatePhotoStatus} from "../daffy_duck/notificationsReducer";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import "./scss/notifications.css";

class Notifications extends React.Component {
    constructor(){
        super()
    }

    componentDidMount = async () => {
            await this.props.getPhotoNotifications();
            for(let i = 0; i < this.props.photoNotifications.length; i++){
                this.props.updatePhotoStatus(this.props.photoNotifications[i].postid)
            }
    }

    render() {
        const mappedPhotoNotifications = this.props.photoNotifications.map((val, i) => {
            return (
                <div className="notificationCard">
                    <h1>{val.title}</h1>
                    <h6>{val.date}</h6>
                    <p>{val.body}</p>
                    <Link to={`/Viewphoto/${val.photo_id}`}>
                        <button>View post</button>
                    </Link>
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
                <div className="notifications">
                    {mappedPhotoNotifications}
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        photoNotifications: reduxState.NotificationReducer.photoNotifications
    }
}

export default connect(mapStateToProps, {getPhotoNotifications, updatePhotoStatus})(Notifications);