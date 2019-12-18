import React from "react"
import {connect} from "react-redux"
import {getFriends} from "./../daffy_duck/profileReducer";
import {Link} from "react-router-dom"

class Friends extends React.Component {
    constructor(){
        super()

        this.state = {
            header: ""
        }
    }

    componentDidMount = async () => {
        await this.props.getFriends();
        if(this.props.friends.length === 0){
            this.setState({header: "No Friend"})
        } else if (this.props.friends.length === 1){
            this.setState({header: "Friend"})
        } else {
            this.setState({header: "Friends"})
        }
    }

    render() {
        console.log(this.props.friends)
        const mappedFriends = this.props.friends.map((val, i) => {
            return (
                <div className="mappedFriend">
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
                <h1 id="garageTitle">{this.state.header}</h1>
                <div className="mainFriend">
                <div className="friends">
                {mappedFriends}
                </div>
                </div>
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