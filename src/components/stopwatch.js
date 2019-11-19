import React from 'react';


class StopWatch extends React.Component {
    constructor(){
        super()

        this.state = {
            milliseconds: 0,
            stopStart: "Start"
       }
    }

    handleStart = () => {
        let elapsed = 0
        if(this.state.stopStart !== "Start"){
            this.setState({stopStart: "Start"})
        } else if (this.state.stopStart !== "Stop"){
            this.setState({stopStart: "Stop"})
        }
        this.setState({
            timingEvents: [...this.state.timingEvents, new Date()]
        })
        for(let i = 0; i < this.state.timingEvents.length; i+=2){
            const start = this.state.timingEvents[i]
            const stop = this.state.timingEvents[i+1] || new Date ()
            elapsed += stop - start;
            console.log(elapsed)
        }
    }

    // tick = () => {
    //     setInterval(this.setState((prevState) => {nonce: this.state.nonce + 1}), 1000)
    //     console.log(this.state.nonce)
    // }

    render(){
        return (
            <div>
                <div>
                    <p id="userUsername"><span>{this.state.hours}</span><span>:</span><span>{this.state.minutes}</span><span>:</span><span>{this.state.seconds}</span><span>.</span><span>{this.state.milliseconds}</span></p>
                    <button onClick={this.handleStart}>{this.state.stopStart}</button>
                </div>
            </div>
        )
    }
}


export default StopWatch;