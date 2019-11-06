import React from "react"
import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile";
import Garage from "./components/garage";
import Races from "./components/races";
import Events from "./components/events";
import AddCar from "./components/addcar"
import {Switch, Route} from "react-router-dom";
import EditCar from "./components/editcar";
import ViewCar from "./components/viewcar";

export default (
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/Register" component={Register}/>
        <Route path="/Profile" component={Profile}/>
        <Route path="/Garage" component={Garage}/>
        <Route path="/Races" component={Races}/>
        <Route path="/Events" component={Events} />
        <Route path="/Addcar" component={AddCar} />
        <Route path="/Editcar" component={EditCar} />
        <Route path="/Viewcar" component={ViewCar} />
    </Switch>
)