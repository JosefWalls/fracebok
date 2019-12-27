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
                <div className="carMainCard">
                <div className="carCard">
                <img className="carImage" src={this.props.userCar.image} ></img>
                <h1 id="carDesc">{this.props.userCar.year} {this.props.userCar.make} {this.props.userCar.model}</h1>
                <div className="trackList">
                <h1>Tracks Visited:</h1>
                {mappedVisits}
                </div>
                <Link to={`/Explore/UserGarage/${this.props.userProfile[0].user_id && this.props.userProfile[0].user_id }`}>
                    <button>Back to garage</button>
                </Link>
                </div>
            </div>
            </div>
        )
    }
}


const mapStateToProps = reduxState => {
    return {
        userCar: reduxState.ExploreReducer.userCar,
        userCarTracks: reduxState.ExploreReducer.userCarTracks,
        userProfile: reduxState.ExploreReducer.userProfile  
    }
}

export default connect(mapStateToProps, {getUserCar, getUserCarTracks})(Viewcar);