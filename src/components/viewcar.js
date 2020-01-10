import React from 'react';
import {Link} from 'react-router-dom';
import {getCar, updateState, deleteCar, visitedTracks} from "./../daffy_duck/garageReducer"
import {connect} from 'react-redux'
import "./scss/viewcar.css"

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
       await this.props.getCar(this.props.match.params.car_id)
       await this.props.visitedTracks(this.props.match.params.car_id)
    }

    handleDelete = () => {
        this.props.history.push("/Garage");
        this.props.deleteCar(this.state.car_id)
    }

    render() {
        // console.log(this.props.visitedTracksList)
        const mappedVisits = this.props.visitedTracksList.map((val, i) => {
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
                <img className="carImage" src={this.props.car.image} ></img>
                <h1 id="carDesc">{this.props.car.year} {this.props.car.make} {this.props.car.model}</h1>
                <div className="trackList">
                    <h1>Tracks Visited:</h1>
                    {mappedVisits}
                </div>
                <Link to="/Editcar">
                    <button>Edit Car</button>
                </Link>
                <button onClick={this.handleDelete}>Delete car</button>  {/* have delete car and redirect to garage page */}
                <Link to="/Garage">
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
        car_id: reduxState.GarageReducer.car_id,
        visitedTracksList: reduxState.GarageReducer.visitedTracksList,
        car: reduxState.GarageReducer.car
    }
}

export default connect(mapStateToProps, {updateState, getCar, deleteCar, visitedTracks})(Viewcar);