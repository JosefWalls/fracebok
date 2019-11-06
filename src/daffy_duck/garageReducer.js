import axios from 'axios'

const initialState = {
    make: "",
    model: "",
    image: "",
    user_id: "",
    year: "",
    garage: [],
    loading: false
}


const UPDATE_STATE = "UPDATE_STATE";
const GET_GARAGE = "GET_GARAGE"
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

export default function reudcer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case UPDATE_STATE:
            return {...state, ...payload}
        case `${GET_GARAGE}_PENDING`:
            return {...state, loading: true}
        case `${GET_GARAGE}_FULFILLED`:
                console.log(payload)
            return {...state, loading: false, garage: payload.data}
        default:
            return state
    }
}