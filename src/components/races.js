import React from 'react';
import {Link} from 'react-router-dom'
import {retrieveUserTracks, updateState} from "./../daffy_duck/raceReducer";
import {getGarage} from "./../daffy_duck/garageReducer"
import {connect} from 'react-redux'
import "./sass/races.css"

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
        console.log(this.props.userTracks)
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
                <h1 id="racesTitle">Races</h1>
            <div className="carCards">
             <div className={this.state.toggleMenu}>
                <img onClick={this.handleClick} id={this.state.toggleIcon} src="https://icon-library.net/images/menu-icon-white-png/menu-icon-white-png-27.jpg"></img>
                <Link to="/Profile">
                    <button className="garageButtons" id="button1">Back to Profile</button>
                </Link>
                <Link to="/Addrace">
                    <button className="garageButtons" id="button2">Add a race</button>
                </Link>
                <Link to="/Addtrack">
                    <button  className="garageButtons" id="button3">Add Track</button>
                </Link>
            </div>
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