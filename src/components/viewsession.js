import React from "react";
import { Link } from "react-router-dom";
import { getSessionDetails, deleteSession, getTrackDetails} from "./../daffy_duck/raceReducer";
import {
  getBestLap,
  createLabels
} from "./../daffy_duck/session_detailsReducer";
import { connect } from "react-redux";
import ViewsessionElement from './ViewsessionElement';
import { Line } from "react-chartjs-2";
import "./scss/viewSession.css"
import {getRaceComments, updateState} from "./../daffy_duck/commentReducer";
import axios from "axios"

class ViewSession extends React.Component {
  constructor() {
    super();

    this.state = {
      session_id: "",
      toggleMenu: "menuClosed",
      toggleIcon: "toggleMenuOn",
      bestLap: "",
      lapCounter: [],
      deltaColors: "deltaTimeSlower",
      chartData: {
        labels: "Lap Improvements",
        datasets: [
          {
            title: "",
            data: [],
            backgroundColor: "rgba(20, 21, 9, 0.75)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10
          }
        ]
      }
    };
  }
  componentDidMount = async () => {
    this.props.getBestLap(this.props.match.params.session_id);
    this.renderGraph();
    this.setState({session_id: this.props.match.params.session_id})
    this.props.getTrackDetails(this.props.match.params.session_id)
    this.props.getRaceComments(this.props.match.params.session_id);
  };

  renderGraph = () => {
    this.props
      .getSessionDetails(this.props.match.params.session_id)
      .then(() => {
        let labels = [];
        let lapData = [];
        for (let i = 0; i < this.props.sessionDetails.length; i++) {
          const inc = i + 1;
          labels.push("Lap " + inc);
          let convert1 = this.props.sessionDetails[i].time.split(":");
          let convert2 = convert1.join("");
          lapData.push(convert2);
        }
        this.setState({
          chartData: {
            labels: labels,
            datasets: [
              {
                data: lapData
              }
            ]
          }
        });
      });
  };

  handleDelete = () => {
    this.props.history.push("/Races")
    this.props.deleteSession(this.state.session_id)
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
  
  commentBody = (e) => {
    this.props.updateState({[e.target.name]: e.target.value})
  }

  postComment = (e) => {
    e.preventDefault()
    axios.post(`/Comment/Add/Race/${this.props.match.params.session_id}`, {
        body: this.props.comment
    })
    .then(() => {
        window.location.reload()
    })
    .catch(error => {
        console.log(error)
    })
  }

  render() {
      
    const mappedLaps = this.props.sessionDetails.map((val, i) => {
      return (
      <div>
        <ViewsessionElement val={val} bestLap={this.props.bestLap} key={i} lapInc={i+ 1} length={this.props.trackDetails[0] && this.props.trackDetails[0].length}/>
      </div>
    )});
    const mappedComments = this.props.raceComments.map((val, i) => {
      return (
        <div className="commentCard">
            <h1>{val.username}</h1>
            <p className="commentDate">posted on {val.date}</p>
            <p id="commentBody">{val.body}</p>
        </div>
    )
    })
    return (
      <div className="main">
      <div className="header">
          <p id="logo">Fracebok</p>
      </div>
        <div className="lapCard">
        <div className="lapTimeSpecs">
        <p id="lapTitle">Laps: {this.props.sessionDetails.length}</p>
          <p id="lengthTitle">Total Estimated Session Length: {Math.floor((this.props.trackDetails[0] && this.props.trackDetails[0].length * (this.props.sessionDetails.length)) * 100) / 100 } miles</p>
        <p id="bestLap">Best Lap: {this.props.bestLap}</p>
        </div>
        <div className="lapTimeCard">
          <div className="lapTimes">{mappedLaps}</div>
        </div>
        <div className="chart">
        <Line
          className="graph"
          data={this.state.chartData}
          height={25}
          width={50}
          options={{
            title: {
              display: true,
              content: "Lap Improvements"
            }
          }}
        />
        </div>
        </div>
        <div className="comments">
                {mappedComments}
                <section>
                  <input type="text" placeholder="Add Comment" name="comment" onChange={this.commentBody}></input>
                  <button onClick={this.postComment} id="AddComment">Add Comment</button>
                </section>
            </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    sessionDetails: reduxState.RaceReducer.sessionDetails,
    bestLap: reduxState.SessionReducer.bestLap,
    labels: reduxState.SessionReducer.labels,
    session_id: reduxState.RaceReducer.session_id,
    trackDetails: reduxState.RaceReducer.trackDetails,
    raceComments: reduxState.CommentReducer.raceComments,
    comment: reduxState.CommentReducer.comment
  };
};

export default connect(
  mapStateToProps,
  { getSessionDetails, getBestLap, createLabels, deleteSession, getTrackDetails, getRaceComments, updateState}
)(ViewSession);
