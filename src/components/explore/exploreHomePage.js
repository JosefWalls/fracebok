import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {getAllUsers} from "./../../daffy_duck/exploreReducer"
import "./sass/exploreHome.css"

class ExploreHomePage extends React.Component {
    constructor(){
        super()
    }

    componentDidMount(){
        this.props.getAllUsers()
    }

    render(){
        const mappedProfiles = this.props.getAll.map((val, i) => {
            return (
                <div className="exploreResultCardOne">
                    <h1>{val.username}</h1>
                    <img src={val.profile}></img>
                    <Link to={`/Explore/User/${val.user_id}`}>
                        <button>View User Profile</button>
                    </Link>
                </div>
        )
        })
        return (
            <div className="main">
                <div className="header">
                    <p id="logo">Fracebok</p>
                </div>
                <h1 id="exploreTitle">Explore Home Page</h1>.
                <input placeholder="Search Users" onChange={this.searchUsers}></input>
                <div className="mappedProfile">
                    {mappedProfiles}
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        getAll: reduxState.ExploreReducer.getAll
    }
}
export default connect(mapStateToProps, {getAllUsers})(ExploreHomePage);