import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {getAllUsers} from "./../../daffy_duck/exploreReducer"
import "./sass/exploreHome.css"

class ExploreHomePage extends React.Component {
    constructor(){
        super()

        this.state = {
            filter: ""
        }
    }

    componentDidMount(){
        this.props.getAllUsers()
    }

    searchUsers = (e) => {
        for(let i = 0; i < this.props.getAll.length; i++){
            console.log(e.target.value)
            if(this.props.getAll[i].username == e.target.value){
                console.log("kinda")
            } else {
                console.log("nope")
            }
        }
    }

    render(){
        const mappedProfiles = this.props.getAll.map((val, i) => {
            return (
                <div className="exploreResultCardOne">
                    <img src={val.profile}></img>
                    <h1>{val.username}</h1>
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
                <div className="mappedProfiles">
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