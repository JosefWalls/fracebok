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

class ViewSession extends React.Component {
  constructor() {
    super();

    this.state = {
      session_id: "",
      bestLap: "",
      lapCounter: [],
      deltaColors: "deltaTimeSlower",
      chartData: {
        labels: "Lap Improvements",
        datasets: [
          {
            title: "",
            data: [],
            backgroundColor: "rgba(75, 192, 192, 0.4)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
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

  render() {
      
    const mappedLaps = this.props.sessionDetails.map((val, i) => {
      return (
      <div>
        <ViewsessionElement val={val} bestLap={this.props.bestLap} key={i} lapInc={i+ 1} length={this.props.trackDetails[0] && this.props.trackDetails[0].length}/>
      </div>
    )});

    return (
      <div>
        <h1>View session</h1>
        <Link to="/Races">
          <button>Back</button>
        </Link>
        <button onClick={this.handleDelete}>Delete Session</button>
        <p>Laps: {this.props.sessionDetails.length}</p>
          <p>Total Estimated Session Length: {Math.floor((this.props.trackDetails[0] && this.props.trackDetails[0].length * (this.props.sessionDetails.length - 1)) * 100) / 100 }miles</p>
        <p>Best Lap: {this.props.bestLap}</p>
        <div className="lapTimeCards">
          <div className="lapTimes">{mappedLaps}</div>
        </div>
        <Line
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
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    sessionDetails: reduxState.RaceReducer.sessionDetails,
    bestLap: reduxState.SessionReducer.bestLap,
    labels: reduxState.SessionReducer.labels,
    session_id: reduxState.RaceReducer.session_id,
    trackDetails: reduxState.RaceReducer.trackDetails
  };
};

export default connect(
  mapStateToProps,
  { getSessionDetails, getBestLap, createLabels, deleteSession, getTrackDetails}
)(ViewSession);
