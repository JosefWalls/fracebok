import {combineReducers, createStore, applyMiddleware} from "redux"
import promise from "redux-promise-middleware";
import loginRegisterReducer from "./daffy_duck/loginRegisterReducer";
import ProfileReducer from "./daffy_duck/profileReducer";
import GarageReducer from "./daffy_duck/garageReducer";
import RaceReducer from "./daffy_duck/raceReducer";
import SessionReducer from "./daffy_duck/session_detailsReducer";
import PhotoReducer from "./daffy_duck/photoReducer"
import ExploreReducer from "./daffy_duck/exploreReducer"
import VideoReducer from "./daffy_duck/videoReducer"

const root = combineReducers({
    loginRegisterReducer,
    ProfileReducer,
    GarageReducer,
    RaceReducer,
    SessionReducer,
    PhotoReducer,
    ExploreReducer,
    VideoReducer
})


export default createStore(root, applyMiddleware(promise))