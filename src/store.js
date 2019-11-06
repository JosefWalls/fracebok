import {combineReducers, createStore, applyMiddleware} from "redux"
import promise from "redux-promise-middleware";
import loginRegisterReducer from "./daffy_duck/loginRegisterReducer";
import ProfileReducer from "./daffy_duck/profileReducer";
import GarageReducer from "./daffy_duck/garageReducer"

const root = combineReducers({
    loginRegisterReducer,
    ProfileReducer,
    GarageReducer
})


export default createStore(root, applyMiddleware(promise))