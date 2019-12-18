import React from 'react';
import {Link} from 'react-router-dom'
import {retrieveUserTracks, updateState} from "./../daffy_duck/raceReducer";
import {getGarage} from "./../daffy_duck/garageReducer"
import {connect} from 'react-redux'
import "./scss/races.css"

class Races extends React.Component {
    constructor(){
        super()

        this.state = {
            toggleMenu: "menuClosed",
            toggleIcon: "toggleMenuOn"
        }
    }

    componentDidMount = async () => {
        await this.props.retrieveUserTracks()
        await this.props.getGarage()
    }

    handleClick = () => {
        if(this.state.toggleMenu === "menuClosed"){
            this.setState({toggleMenu: "menuOpen"})
            this.setState({toggleIcon: "toggleMenuOff"})
        } else {
            this.setState({toggleMenu: "menuClosed"})
            this.setState({toggleIcon: "toggleMenuOn"})
        }
      }

    render(){
        const mappedTracks = this.props.userTracks.map((val, i) => {
            return (
                <div className="mappedUserTracks">
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
                <div className="mappedCar">
                    <h1>{val.year} {val.make} {val.model}</h1>
                    <img className="carImage" src={val.image}></img>
                    <Link to={`/Viewcarsessions/${val.car_id}`}>
                        <button>View</button>
                    </Link>
                </div>
            )
        })
        return (
            <div className="main">
                <div className="header">
                     <p id="logo">Fracebok</p>
                </div>
            <div className="carCards">
                <section className="userRaces">
                <div className="mappedTracks">
                        {mappedTracks}
                </div>
                <div className="mappedGarage">
                        {mappedGarage}
                </div>
                </section>
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