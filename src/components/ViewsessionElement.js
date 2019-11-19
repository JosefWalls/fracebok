import React, { Component } from "react";

const laps= []
const lapTimes= []

export default class ViewsessionElement extends Component {
  state = { deltaColors: "deltaTimeSlower", count: 0};

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
    laps.push(convert4)
    return <span className="deltaTimeSlower">{difference}</span>
  };

  handleEquals = time => {
    let convert3 = time.split(":");
    let convert4 = convert3.join("");
    laps.push(convert4)
    return <span className="deltaTimeEqual">+0.00</span>
  };

  handleStart = (time) => {
    laps.push(time)
    return <span className="deltaTimeEqual">...</span>
  }

  handlePrevDelta = (lapInc) => {
    const differnece = Math.floor((laps[lapInc - 1] - laps[lapInc]) * 100) / 100

    if(differnece > 0){
      return <span className="deltaTimeEqual">+{differnece}</span>
    } else {
    return <span className="deltaTimeSlower">{differnece}</span>
    }
  }




  render() {
    const {val, key, lapInc, length} = this.props;
    const splitTime = val.time.split("00:")
    const sub = lapInc - 1;
    const totalLengthDriven  = Math.floor((length * lapInc) * 100) / 100
    return (
      <div key={key} className="lapTimeCards">
        <div>
          <p className="lapCount">Lap {lapInc}</p>
        </div>
          <div className="splitTime">
            <p>{splitTime}</p>
          </div>
          <p className="lapCount">Prev. Lap Delta:
            <span>{lapInc - 1 === 0? this.handleStart(val.time): lapInc - 1 !== 0 ? this.handlePrevDelta(lapInc) : null}</span>
          </p>
          <p>Best Lap Delta: 
            <span>
              {
                this.props.bestLap !== val.time
                  ? this.handleDelta(val.time)
                  : this.handleEquals(val.time)
              }
            </span>
            </p>
            <p className="totalLengthDriven">{totalLengthDriven} miles</p>
      </div>
    );
  }
}
