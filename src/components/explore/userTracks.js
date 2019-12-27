import React, { Component } from 'react'
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {getUserTracks} from "./../../daffy_duck/exploreReducer"

class userTracks extends Component {
    constructor(){
        super()

        this.state = {
            toggleMenu: "menuClosed",
            toggleIcon: "toggleMenuOn"
        }
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

    componentDidMount(){
        this.props.getUserTracks(this.props.match.params.user_id)
    }
    
    render() {
        const userId = this.props.match.params.user_id
        const mappedUserTracks = this.props.userTracks.map((val, i) => {
            return (
                <div className="mappedUserTracks">
                    <h1>{val.track_name}</h1>
                    <p>Length: {val.length}</p>
                    <p>Turns: {val.turns}</p>
                    <Link to={`/Explore/User/Sessions/${userId}/${val.track_id}`} key={i}>
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
                    {mappedUserTracks}
                </div>
                </section>
            </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        userTracks: reduxState.ExploreReducer.userTracks
    }
}

export default connect(mapStateToProps, {getUserTracks})(userTracks)