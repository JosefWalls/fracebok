import React from "react";
import { Link } from "react-router-dom";
import { getGarage, updateState } from "./../daffy_duck//garageReducer";
import { connect } from "react-redux";
import "./scss/garage.css";
import "./scss/flyout.css"

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
    this.props.getGarage();
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
    const mappedGarage =
      this.props.garage &&
      this.props.garage.map((val, i) => {
        return (
          <div className="mappedCars">
            <img src={val.image} className="carImage"></img>
            <h1>
              {val.year} {val.make} {val.model}
            </h1>
            <Link to={`/Viewcar/${val.car_id}`} key={i}>
              <button>View</button>
            </Link>
          </div>
        );
      });
    // console.log(this.state)
    return (
      <div className="main">
        <div className="header">
          <p id="logo">Fracebok</p>
        </div>
        <div className="carCards">
          <div className="flyout">
            <Link to="/Addcar">
             <button>Add a Car</button>
            </Link>
            <Link to="/Profile">
              <button>Profile</button>
            </Link>
          </div>
          <div className="garage">{mappedGarage}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    garage: reduxState.GarageReducer.garage,
    car_id: reduxState.GarageReducer.car_id
  };
};

export default connect(mapStateToProps, { getGarage, updateState })(Garage);
