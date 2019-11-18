import axios from 'axios'

const initalState = {
    user: [],
    loading: false,
    firstname: "",
    username: "",
    profile: "",
    header: "",
    friends: []
}


const RETRIEVE_INFO = "RETRIEVE_INFO"
const UPDATE_STATE = "UPDATE_STATE"
const DELETE_PROFILE = "DELETE_PROFILE"
const GET_FRIENDS = "GET_FRIENDS"

export const retrieveInfo = () => {
    return {
        type: RETRIEVE_INFO,
        payload: axios.get("/api/profile")
    }
}

export const updateState = (e) => {
    return {
        type: UPDATE_STATE,
        payload: e
    }
}

export const deleteProfile = () => {
    return {
        type: DELETE_PROFILE,
        payload: axios.delete("/api/DeleteProfile")
    }
}

export const getFriends = () => {
    return {
        type: GET_FRIENDS,
        payload: axios.get("/api/Friends")
    }
}

export default function reducer(state = initalState, action){
    const {type, payload} = action;
    switch(type){
        case `${RETRIEVE_INFO}_PENDING`:
            return {...state, loading: true}
        case `${RETRIEVE_INFO}_FULFILLED`:
            return {...state, loading: false, user: payload.data}
        case UPDATE_STATE:
            return {...state, ...payload}
        case `${DELETE_PROFILE}_PENDING`:
            return {...state, loading: true}
        case `${DELETE_PROFILE}_FULFILLED`:
            return {...state, loading: false}
        case `${GET_FRIENDS}_PENDING`:
            return {...state, loading: true}
        case `${GET_FRIENDS}_FULFILLED`:
            return {...state, loading: false, friends: payload.data}
        default:
            return state
    }
}