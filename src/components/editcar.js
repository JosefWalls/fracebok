import React from 'react';
import {Link} from 'react-router-dom'
import {getCar, editCar} from "./../daffy_duck/garageReducer";
import {connect} from 'react-redux'
import Axios from 'axios';
import {storage} from "./../firebase-config";

class EditCar extends React.Component {
    constructor(){
        super()

        this.state = {
            make: "",
            model: "",
            year: "",
            image: ""
        }
    }

    componentDidMount(){
        this.setState({make: this.props.car.make})
        this.setState({model: this.props.car.model})
        this.setState({year: this.props.car.year})
        this.setState({image: this.props.car.image})
    }

    handleEdit = (e) => {
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state)
    }
 
    handleSubmit = (e) => {
        e.preventDefault();
        
        console.log(this.state)
        const car_id = this.props.car.car_id
        Axios.put(`/garage/cars/${car_id}`, {
            make: this.state.make,
            model: this.state.model,
            year: this.state.year,
            image: this.state.image
        })
        this.props.history.push(`/garage/cars/${car_id}`)
    }

    handleNewImage = (e) => {
        if(e.target.files[0]){
            const image = (e.target.files[0])
            const uploadTask = storage.ref(`car/${image.name}`).put(image);
            uploadTask.on("state_changed", 
            () => {
                storage.ref('car').child(image.name).getDownloadURL()
                .then(url => {
                    this.setState({image: url})
                })
            }
            )
        }
    }

    render(){
        return(
            <div>
                <p>Edit car</p>
                <Link to="/Viewcar">
                    <button>Back to Vehicle</button>
                </Link>
                <input placeholder={this.props.car.make} name="make" onChange={this.handleEdit}></input>
                <input placeholder={this.props.car.model} name="model" onChange={this.handleEdit}></input>
                <input placeholder={this.props.car.year} name="year" onChange={this.handleEdit}></input>
                <input type="file" placeholder="Update image" onChange={this.handleNewImage} name="image"></input>
                <button onClick={this.handleSubmit}>Submit updates</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        car: reduxState.GarageReducer.car
    }
}

export default connect(mapStateToProps, {getCar, editCar}) (EditCar)