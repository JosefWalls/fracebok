import React from 'react'
import {getCarSessions} from "./../daffy_duck/raceReducer"
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


class ViewCarSession extends React.Component {
    constructor(){
        super()

        this.state = {
            toggleMenu: "menuClosed",
            toggleIcon: "toggleMenuOn"
        }
    }


    componentDidMount = async () => {
        await this.props.getCarSessions(this.props.match.params.car_id)
        console.log(this.props.carSessions)
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
        let mappedSessions = this.props.carSessions.map((val, i) => {
            return (
                <div className="mapped">
                    <h1>{val.year} {val.make} {val.model}</h1>
                    <img src={val.header} className="carImage"></img>
                    <Link to={`/Viewsession/${val.session_id}`}>
                        <button>View Session</button>
                    </Link>
                </div>
            )
        })
        return (
            <div className="main">
            <div className="header">
                <p id="logo">Fracebok</p>
            </div>
            <div className="flyout">
             <div className={this.state.toggleMenu}>
             <img onClick={this.handleClick} id={this.state.toggleIcon} src="https://icon-library.net/images/menu-icon-white-png/menu-icon-white-png-27.jpg"></img>
               <Link to="/Races">
                    <button id="button3">Back</button>
                </Link>
            </div>
          </div>
                <h1 id="registerTitle">View Car</h1>
                <div className="mappedTrackCard">
                    
                <div className="mappedTrackSessions">
                {mappedSessions}
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        carSessions: reduxState.RaceReducer.carSessions
    }
}

export default connect(mapStateToProps, {getCarSessions})(ViewCarSession)