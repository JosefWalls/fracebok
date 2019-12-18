import React from "react"
import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile";
import Garage from "./components/garage";
import Races from "./components/races";
import AddPhoto from "./components/addphotos";
import Photos from "./components/photos"
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
import ViewPhoto from "./components/viewphoto";
import EditPhoto from "./components/editPhoto";
import Friends from "./components/friends";
import Videos from "./components/videos"
import AddVideo from "./components/addvideos";
import ViewVideo from "./components/viewvideo";

//explore page

import ExploreHomePage from "./components/explore/exploreHomePage"
import UserProfile from "./components/explore/userProfile"
import UserGarage from "./components/explore/userGarage"
import UserCar from "./components/explore/userCar"
import UserTracks from "./components/explore/userTracks"
import UserTrackSessions from "./components/explore/userTrackSessions"
import UserSessionDetails from "./components/explore/userSession"
import UserPhotos from "./components/explore/userPhotos"
import userPhotos from "./components/explore/userPhotos";
import viewvideo from "./components/viewvideo";
import UserVideos from "./components/explore/userVideos"
import userVideos from "./components/explore/userVideos";
import userVideo from "./components/explore/userVideo";

export default (
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/Register" component={Register}/>
        <Route path="/Profile" component={Profile}/>
        <Route path="/Garage" component={Garage}/>
        <Route exact path="/Races/:track_id" component={Viewtrack} />
        <Route path="/Races" component={Races}/>
        <Route path="/Addphoto" component={AddPhoto} />
        <Route path="/Photos" component={Photos} />
        <Route path="/Addcar" component={AddCar} />
        <Route path="/Editcar" component={EditCar} />
        <Route path="/Viewcar/:car_id" component={ViewCar} />
        <Route path="/Addtrack" component={AddTrack} />
        <Route path="/Addrace" component={Addrace} />
        <Route path="/Videos" component={Videos} />
        <Route path="/Video/:video_id" component={viewvideo} />
        <Route path="/AddVideo" component={AddVideo} />
        <Route path="/Viewsession/:session_id" component={Viewsession} />
        <Route path="/Editprofile/:user_id" component={EditProfile} />
        <Route path="/Edittrack/:track_id" component={EditTrack} />
        <Route path="/Viewcarsessions/:car_id" component={ViewCarSession} />
        <Route path="/Viewphoto/:photo_id" component={ViewPhoto} />
        <Route path="/EditPhoto/:photo_id" component={EditPhoto} />
        <Route path="/Explore/Home" component={ExploreHomePage} />
        <Route exact path="/Explore/User/Sessions/:user_id/:track_id" component={UserTrackSessions} />
        <Route exact path="/Explore/User/Session/:session_id" component={UserSessionDetails} />
        <Route path="/Explore/User/:user_id" component={UserProfile} />
        <Route path="/Explore/UserGarage/:user_id" component={UserGarage} />
        <Route path="/Explore/UserCar/:car_id" component={UserCar} />
        <Route path="/Friends" component={Friends} />
        <Route path="/Explore/UserTracks/:user_id" component={UserTracks} />
        <Route path="/Explore/UserPhotos/:user_id" component={userPhotos} />
        <Route exact path="/Explore/UserVideo/:video_id" component={userVideo} />
        <Route path="/Explore/UserVideos/:user_id" component={userVideos} />
    </Switch>
)