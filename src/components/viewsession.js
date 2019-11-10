import React from "react"
import {Link} from 'react-router-dom';
import {getSessionDetails} from "./../daffy_duck/raceReducer";
import {getBestLap, createLabels} from "./../daffy_duck/session_detailsReducer"
import {connect} from 'react-redux'


import {Line} from 'react-chartjs-2'


class ViewSession extends React.Component {
    constructor(){
        super()

        this.state = {
            bestLap: "",
            lapCounter: [],
            chartData: {
                labels: "",
                dataSets: {
                    title: "",
                    data: [],
                    backgroundColor: "",
                    borderColor: ""
                }
            }
    }
    }
    componentDidMount= async () => {
         this.props.getBestLap(this.props.match.params.session_id)
         await this.renderGraph()
    }


    renderGraph = () => {
        this.props.getSessionDetails(this.props.match.params.session_id)
        .then(() => {
            let labels = []
            let chartData = []
            

            for(let i = 0; i < this.props.sessionDetials.length; i++){
                const inc = i + 1;
                labels.push("Lap " + inc)
                chartData.push(this.props.sessionDetials[i].time)
                // console.log(chartData)
            }

            this.setState({
                chartData: {
                    labels: labels,
                    dataSets: {
                        title: "Lap Improvements",
                        data: [1, 2, 1],
                        //data: chartData,
                        backgroundColor:  'rgba(75, 192, 192, 0.4)',
                        borderColor: 'rgba(75, 192, 192, 1)'
                    }
                }
            })
        })
    }
    render(){
        console.log(this.state.chartData.dataSets)
        // console.log(this.state.chartData.dataSets.title)
        const mappedLaps = this.props.sessionDetials.map((val, i) => {
            return (
                <div className="mapped">
                    <p>{val.time}</p>
                <p>Delta:</p>
                </div>
                
            )
            
        })
 
        return (
            <div className="cards">
                <h1>View session</h1>
                <Link to="/Races">
                    <button>Back</button>
                </Link>
                <p>Laps: {this.props.sessionDetials.length}</p>
                <p>Best Lap: {this.props.bestLap}</p>
                {mappedLaps}
                <Line
                        data={this.state.chartData}
                        options={{
                            title:{
                                display:true,
                                text: 'Lap Improvements'
                            },
                            legend: {
                                display: true
                            }
                        }}
                        
                    />
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        sessionDetials: reduxState.RaceReducer.sessionDetials,
        bestLap: reduxState.SessionReducer.bestLap,
        labels: reduxState.SessionReducer.labels
    }
}

export default connect(mapStateToProps, {getSessionDetails, getBestLap, createLabels})(ViewSession)