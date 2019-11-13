import axios from 'axios'

const initialState = {
    make: "",
    model: "",
    image: "",
    user_id: "",
    year: "",
    garage: [],
    loading: false,
    car: [],
    visitedTracksList: []
}


const UPDATE_STATE = "UPDATE_STATE";
const GET_GARAGE = "GET_GARAGE";
const GET_CAR = "GET_CAR";
const DELETE_CAR = "DELETE_CAR";
const EDIT_CAR = "EDIT_CAR";
const VISITED_TRACKS = "VISITED_TRACKS"

export const updateState = e => {
    return {
        type: UPDATE_STATE,
        payload: e
    }
}

export const getGarage = () => {
    return {
        type: GET_GARAGE,
        payload: axios.get("/garage/cars")
    }
    
}

export const getCar = (car_id) => {
    return {
        type: GET_CAR,
        payload: axios.get(`/garage/cars/${car_id}`)
    }
}

export const deleteCar = (car_id) => {
    return {
        type: DELETE_CAR,
        payload: axios.delete(`/garage/cars/${car_id}`)
    }
}


export const editCar = (car_id) => {
    return {
        type: EDIT_CAR,
        payload: axios.put(`/garage/cars/${car_id}`)
    }
}

export const visitedTracks = (car_id) => {
    return {
        type: VISITED_TRACKS,
        payload: axios.get(`/races/cars/sessions/${car_id}`)
    }
}

export default function reudcer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case UPDATE_STATE:
            return {...state, ...payload}
        case `${GET_GARAGE}_PENDING`:
            return {...state, loading: true}
        case `${GET_GARAGE}_FULFILLED`:
                // console.log(payload)
            return {...state, loading: false, garage: payload.data}
        case `${GET_CAR}_PENDING`:
            return {...state, loading: true}
        case `${GET_CAR}_FULFILLED`:
            return {...state, loading: false, car: payload.data}
        case `${DELETE_CAR}_PENDING`:
            return {...state, loading: true}
        case `${DELETE_CAR}_FULFILLED`:
            return {...state, loading: false}
        case `${EDIT_CAR}_PENDING`:
            return {...state, loading: true}
        case `${EDIT_CAR}_FULFILLED`:
            return {...state, loading: false}
        case `${VISITED_TRACKS}_PENDING`:
            return {...state, loading: true}
        case `${VISITED_TRACKS}_FULFILLED`:
            console.log(payload.data)
            return {...state, loaidng: true, visitedTracksList: payload.data}
        default:
            return state
    }
}