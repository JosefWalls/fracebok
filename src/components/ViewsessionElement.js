import React, { Component } from "react";
import "./sass/viewsession.css"
export default class ViewsessionElement extends Component {
  state = { deltaColors: "deltaTimeSlower"};

  componentDidMount() {
    if(this.props.bestLap !== this.props.val.time) {
      this.handleDelta(this.props.val.time)
    } else {
      this.handleEquals(this.props.val.time)
    }
  }

  handleDelta = time => {
    // best lap conversion
    let convert1 = this.props.bestLap.split(":");
    let convert2 = convert1.join("");
    // //user laps
    let convert3 = time.split(":");
    let convert4 = convert3.join("");

    const difference = Math.floor((convert2 - convert4) * 100) /100
    console.log(difference)
    return <span className="deltaTimeSlower">{difference}</span>
  };

  handleEquals = time => {
    return <span className="deltaTimeEqual">+0.00</span>
  };


  render() {
    const {val, key} = this.props;
    console.log(val)
    const splitTime = val.time.split("00:")

    return (
      <div key={key} className="lapTimeCards">
          <div className="splitTime">
            <p>{splitTime}</p>
          </div>

          <p>Best Lap Delta: 
            <span>
              {
                this.props.bestLap !== val.time
                  ? this.handleDelta(val.time)
                  : this.handleEquals(val.time)
              }
            </span>
            </p>
      </div>
    );
  }
}
