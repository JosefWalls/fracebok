import React from "react";
import {connect} from "react-redux";
import {getRaceNotificatins, updateRaceStatus} from "./../daffy_duck/notificationsReducer";
import {Link} from "react-router-dom";

class notificationRaces extends React.Component {
    constructor(){
        super()
    }

    componentDidMount = async () => {
        await this.props.getRaceNotificatins()
        for(let i = 0; i < this.props.raceNotifications.length; i++){
            this.props.updateRaceStatus(this.props.raceNotifications[i].session_id)
        }
    }


    render() {
        const mappedNotifications = this.props.raceNotifications.map((val, i) => {
            return (
                <div className="notificationCard">
                    <h6>{val.date}</h6>
                    <p>{val.body}</p>
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
                    {mappedNotifications}
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        raceNotifications: reduxState.NotificationReducer.raceNotifications
    }
}

export default connect(mapStateToProps, {getRaceNotificatins, updateRaceStatus})(notificationRaces);