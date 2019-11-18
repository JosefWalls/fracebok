import React from "react"
import {connect} from "react-redux"
import {getFriends} from "./../daffy_duck/profileReducer";
import {Link} from "react-router-dom"

class Friends extends React.Component {
    constructor(){
        super()
    }

    componentDidMount = async () => {
        await this.props.getFriends();
    }

    render() {
        console.log(this.props.friends)
        const mappedFriends = this.props.friends.map((val, i) => {
            return (
                <div>
                    <h1>{val.username}</h1>
                    <img src={val.profile} className="carImage"></img>
                    <Link to={`/Explore/User/${val.user_id}`}>
                        <button>View Profile</button>
                    </Link>
                </div>
            )
        })
        return (
            <div className="main">
            <div className="header">
                 <p id="logo">Fracebok</p>
            </div>
                <h1>Friends</h1>
                {mappedFriends}
            </div>
        )
    }
}


const mapStateToProps = reduxState => {
    return {
        friends: reduxState.ProfileReducer.friends
    }
}

export default connect(mapStateToProps, {getFriends})(Friends);