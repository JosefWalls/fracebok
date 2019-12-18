import React from 'react';
import {Link} from 'react-router-dom';
import {getUserCar, getUserCarTracks} from "./../../daffy_duck/exploreReducer"
import {connect} from 'react-redux'

class Viewcar extends React.Component {
    constructor(){
        super()

        this.state = {
            make: "",
            model: "",
            year: "",
            header: "",
            car_id: ""
        }
    }


    componentDidMount = async () => {
       await this.props.getUserCar(this.props.match.params.car_id)
       await this.props.getUserCarTracks(this.props.match.params.car_id)
    }

    render() {
        // console.log(this.props.visitedTracksList)
        const mappedVisits = this.props.userCarTracks.map((val, i) => {
            return (
                <div>
                    <h1>{val.track_name}</h1>
                </div>
            )
        })
        return (
            <div className="main">
                <div className="header">
                    <p id="logo">Fracebok</p>
                </div>
                <div className="carCard">
                <img className="carImage" src={this.props.userCar.image} ></img>
                <h1>{this.props.userCar.year} {this.props.userCar.make} {this.props.userCar.model}</h1>
                <h1>Tracks Visited:</h1>
                {mappedVisits}
                <Link to="/Garage">
                    <button>Back to garage</button>
                </Link>
                </div>
            </div>
        )
    }
}


const mapStateToProps = reduxState => {
    return {
        userCar: reduxState.ExploreReducer.userCar,
        userCarTracks: reduxState.ExploreReducer.userCarTracks
    }
}

export default connect(mapStateToProps, {getUserCar, getUserCarTracks})(Viewcar);