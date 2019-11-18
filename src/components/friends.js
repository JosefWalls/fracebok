import React from "react"
import {connect} from "react-redux"
import {getFriends} from "./../daffy_duck/profileReducer"

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
                </div>
            )
        })
        return (
            <div>
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