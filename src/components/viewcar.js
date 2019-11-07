import React from 'react';
import {Link} from 'react-router-dom';
import {getCar, updateState, deleteCar} from "./../daffy_duck/garageReducer"
import {connect} from 'react-redux'
import "./sass/viewcar.css";

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


    componentDidMount(){
        this.props.getCar(this.props.match.params.car_id)
        .then(response => {
            this.setState({make: response.action.payload.data.make})
            this.setState({model: response.action.payload.data.model})
            this.setState({year: response.action.payload.data.year})
            this.setState({header: response.action.payload.data.image})
            this.setState({car_id: response.action.payload.data.car_id})
        })
    }

    handleDelete = () => {
        this.props.history.push("/Garage");
        this.props.deleteCar(this.state.car_id)
    }

    render() {
        // console.log(this.state.car_id)
        return (
            <div>
                <p>View</p>
                <h1>{this.state.year} {this.state.make} {this.state.model}</h1>
                <img className="carImage" src={this.state.header} ></img>
                <Link to="/Editcar">
                    <button>Edit Car</button>
                </Link>
                <button onClick={this.handleDelete}>Delete car</button>  {/* have delete car and redirect to garage page */}
                <Link to="/Garage">
                    <button>Back to garage</button>
                </Link>
            </div>
        )
    }
}


const mapStateToProps = reduxState => {
    return {
        car_id: reduxState.GarageReducer.car_id
    }
}

export default connect(mapStateToProps, {updateState, getCar, deleteCar})(Viewcar);