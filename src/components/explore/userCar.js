import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
// import "./sass/viewcar.css"

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
    }


    render() {
        return (
            <div className="main">
                <div className="header">
                    <p id="logo">Fracebok</p>
                </div>
                {/* <div className="carCard">
                <img className="carImage" src={this.props.car.image} ></img>
                <h1>{this.props.car.year} {this.props.car.make} {this.props.car.model}</h1>
                <h1>Tracks Visited:</h1>
                {mappedVisits}
                <button onClick={this.handleDelete}>Delete car</button>  {/* have delete car and redirect to garage page */}
                {/* <Link to="/Garage">
                    <button>Back to garage</button>
                </Link>
                </div> */} */}
            </div>
        )
    }
}


// const mapStateToProps = reduxState => {
//     return {
//         car_id: reduxState.GarageReducer.car_id,
//         visitedTracksList: reduxState.GarageReducer.visitedTracksList,
//         car: reduxState.GarageReducer.car
//     }
// }

// export default connect(mapStateToProps, {updateState, getCar, deleteCar, visitedTracks})(Viewcar);

export default Viewcar;