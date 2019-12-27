import React from "react";
import { Link } from "react-router-dom";
import { getGarage } from "./../../daffy_duck/exploreReducer";
import { connect } from "react-redux";

class Garage extends React.Component {
  constructor() {
    super();

    this.state = {
      car_id: 0,
      toggleMenu: "menuClosed",
      toggleIcon: "toggleMenuOn"
    };
  }

  componentDidMount() {
    this.props.getGarage(this.props.match.params.user_id);

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

  render() {
    const mappedGarage = this.props.userGarage.map((val, i) => {
        return (
          <div className="mappedCars">
            <img src={val.image} className="carImage"></img>
            <h1>
              {val.year} {val.make} {val.model}
            </h1>
            <Link to={`/Explore/UserCar/${val.car_id}`} key={i}>
              <button>View</button>
            </Link>
          </div>
        );
      });
    return (
      <div className="main">
        <div className="header">
          <p id="logo">Fracebok</p>
        </div>
        <div className="carCards">
          <div className="flyout">
            <Link to={`/Explore/User/${this.props.userProfile[0].user_id && this.props.userProfile[0].user_id }`}>
              <button className="garageButtons" id="button2">Back to profile</button>
            </Link>
            </div>
          </div>
          <div className="garage">{mappedGarage}</div>
        </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    userGarage: reduxState.ExploreReducer.userGarage,
    userProfile: reduxState.ExploreReducer.userProfile
  };
};

export default connect(mapStateToProps, {getGarage})(Garage);