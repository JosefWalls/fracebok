import axios from 'axios'

const initialState = {
    make: "",
    model: "",
    image: "",
    user_id: "",
    year: "",
    garage: [],
    loading: false,
    car: []
}


const UPDATE_STATE = "UPDATE_STATE";
const GET_GARAGE = "GET_GARAGE";
const GET_CAR = "GET_CAR";
const DELETE_CAR = "DELETE_CAR";
const EDIT_CAR = "EDIT_CAR"

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
        default:
            return state
    }
}