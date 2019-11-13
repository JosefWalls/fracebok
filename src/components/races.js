import React from 'react';
import {Link} from 'react-router-dom'
import {retrieveUserTracks, updateState} from "./../daffy_duck/raceReducer";
import {getGarage} from "./../daffy_duck/garageReducer"
import {connect} from 'react-redux'

class Races extends React.Component {
    constructor(){
        super()
    }

    componentDidMount = async () => {
        await this.props.retrieveUserTracks()
        await this.props.getGarage()
    }

    render(){
        const mappedTracks = this.props.userTracks.map((val, i) => {
            return (
                <div className="mapped">
                    <h1>{val.track_name}</h1>
                    <p>Length: {val.length}</p>
                    <p>Turns: {val.turns}</p>
                    <Link to={`/Races/${val.track_id}`} key={i}>
                    <button>View</button>
                   </Link>
                </div>
            )
        })

        const mappedGarage = this.props.garage.map((val, i) => {
            return (
                <div className="mapped">
                    <h1>{val.year} {val.make} {val.model}</h1>
                    <img className="carImage" src={val.image}></img>
                    <Link to={`/Viewcarsessions/${val.car_id}`}>
                        <button>View</button>
                    </Link>
                </div>
            )
        })
        return (
            <div className="cards">
                <h1>Races</h1>
                <Link to="/Profile">
                    <button>Back to Profile</button>
                </Link>
                <Link to="/Addrace">
                    <button>Add a race</button>
                </Link>

                <div>
                    <h1>By Tracks:</h1>
                    <Link to="/Addtrack">
                        <button>Add Track</button>
                    </Link>
                </div>
                <div className="garage">
                {mappedTracks}
                </div>
                <div className="garage">
                    {mappedGarage}
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        userTracks: reduxState.RaceReducer.userTracks,
        garage: reduxState.GarageReducer.garage
    }
}

export default connect(mapStateToProps, {retrieveUserTracks, getGarage})(Races);