import React from "react"
import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile";
import Garage from "./components/garage";
import Races from "./components/races";
import Photos from "./components/photos";
import AddCar from "./components/addcar"
import {Switch, Route} from "react-router-dom";
import EditCar from "./components/editcar";
import ViewCar from "./components/viewcar";
import AddTrack from "./components/addTrack";
import Viewtrack from "./components/viewtrack";
import Addrace from "./components/addrace";
import Viewsession from "./components/viewsession";
import EditProfile from "./components/editprofile";
import EditTrack from "./components/edittrack";
import ViewCarSession from "./components/viewcarSessions"

export default (
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/Register" component={Register}/>
        <Route path="/Profile" component={Profile}/>
        <Route path="/Garage" component={Garage}/>
        <Route exact path="/Races/:track_id" component={Viewtrack} />
        <Route path="/Races" component={Races}/>
        <Route path="/Photos" component={Photos} />
        <Route path="/Addcar" component={AddCar} />
        <Route path="/Editcar" component={EditCar} />
        <Route path="/Viewcar/:car_id" component={ViewCar} />
        <Route path="/Addtrack" component={AddTrack} />
        <Route path="/Addrace" component={Addrace} />
        <Route path="/Viewsession/:session_id" component={Viewsession} />
        <Route path="/Editprofile/:user_id" component={EditProfile} />
        <Route path="/Edittrack/:track_id" component={EditTrack} />
        <Route path="/Viewcarsessions/:car_id" component={ViewCarSession} />
    </Switch>
)