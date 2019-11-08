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
import AddTrack from "./components/addTrack";
import Viewtrack from "./components/viewtrack";
import Addrace from "./components/addrace"

export default (
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/Register" component={Register}/>
        <Route path="/Profile" component={Profile}/>
        <Route path="/Garage" component={Garage}/>
        <Route exact path="/Races/:track_id" component={Viewtrack} />
        <Route path="/Races" component={Races}/>
        <Route path="/Events" component={Events} />
        <Route path="/Addcar" component={AddCar} />
        <Route path="/Editcar" component={EditCar} />
        <Route path="/Viewcar/:car_id" component={ViewCar} />
        <Route path="/Addtrack" component={AddTrack} />
        <Route path="/Addrace" component={Addrace} />
    </Switch>
)