import React from "react";
import {connect} from "react-redux";
import {getGarage} from "./../../daffy_duck/exploreReducer"
import {Link} from "react-router-dom"

class UserGarage extends React.Component {
    constructor(){
        super()
    }

    componentDidMount = async () => {
        console.log(this.props.match.params.user_id)
       await this.props.getGarage(this.props.match.params.user_id)
    }

    render() {
        const mappedGarage = this.props.userGarage.map((val, i) => {
            return (
                <div>
                    <h3>{val.year} {val.make} {val.model}</h3>
                    <Link to={`/Explore/UserCar/${val.car_id}`}>
                        <button>View Car</button>
                    </Link>
                </div>
            )
        })
        return (
            <div>
                <h1>User Garage</h1>
                {mappedGarage}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        userGarage: reduxState.ExploreReducer.userGarage
    }
}

export default connect(mapStateToProps, {getGarage})(UserGarage);