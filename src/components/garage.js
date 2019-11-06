import React from "react"
import {Link} from "react-router-dom"
import {getGarage} from "./../daffy_duck//garageReducer"
import {connect} from 'react-redux'
import "./sass/garage.css"

class Garage extends React.Component {
    constructor(){
        super()
    }

    componentDidMount(){
        this.props.getGarage();
    }

    handleView = (i) => {
        console.log(i)
    }

    render() {
        const mappedGarage = this.props.garage && this.props.garage.map((val, i) => {
            return (
               <div className="mapped">
                   <h1>{val.year} {val.make} {val.model}</h1>
                   <img src={val.image} className="carImage"></img>
                   <Link to="/Viewcar">
                       <button onClick={() => console.log(this.props.match.params)}>View car</button>
                   </Link>
               </div>
            )
        })
        return (
            <div className="cards">
                <h1>Garage</h1>
                <Link to="/Profile">
                    <button>Back to profile</button>
                </Link>
                <Link to="/Addcar">
                    <button>Add Car</button>
                </Link>
                <div className="garage">
                {mappedGarage}
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        garage: reduxState.GarageReducer.garage
    }
}


export default connect(mapStateToProps, {getGarage})(Garage);