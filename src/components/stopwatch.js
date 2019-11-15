import React from 'react';


class StopWatch extends React.Component {
    constructor(){
        super()

        this.state = {

        }
    }

    handleStart = () => {
        alert("Session Starting")
    }

    render(){
        return (
            <div>
                <div>
                    <p><span>00</span><span>:</span><span>00</span><span>:</span><span>00</span><span>.</span><span>000</span></p>
                    <button onClick={this.handleStart}>Start</button>
                    <button>Lap</button>
                    <button>Stop</button>
                </div>
            </div>
        )
    }
}


export default StopWatch;