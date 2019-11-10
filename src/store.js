import {combineReducers, createStore, applyMiddleware} from "redux"
import promise from "redux-promise-middleware";
import loginRegisterReducer from "./daffy_duck/loginRegisterReducer";
import ProfileReducer from "./daffy_duck/profileReducer";
import GarageReducer from "./daffy_duck/garageReducer";
import RaceReducer from "./daffy_duck/raceReducer";
import SessionReducer from "./daffy_duck/session_detailsReducer"

const root = combineReducers({
    loginRegisterReducer,
    ProfileReducer,
    GarageReducer,
    RaceReducer,
    SessionReducer
})


export default createStore(root, applyMiddleware(promise))