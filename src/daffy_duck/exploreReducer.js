import axios from 'axios'

const initalState = {
    getAll: [],
    allUsers: [],
    loading: false,
    userProfile: [],
    userGarage: [],
    userCar: [],
    userCarTracks: [],
    userTracks: [],
    userTrackSessions: [],
    userSessionDetails: [],
    userPhotos: []
}

const SEARCH_ALL_USERS = "SEARCH_ALL_USERS"
const GET_ALL_USERS = "GET_ALL_USERS"
const GET_USER_PROFILE = "GET_USER_PROFILE"
const GET_USER_GARAGE = "GET_USER_GARAGE"
const USER_CAR = "USER_CAR"
const USER_CAR_TRACKS = "USER_CAR_TRACKS"
const USER_TRACKS = "USER_TRACKS"
const TRACK_SESSIONS = "TRACK_SESSIONS"
const SESSION_DETAILS = "SESSION_DETAILS"
const USER_PHOTOS = "USER_PHOTOS"

export const searchAllUsers = (e) => {
    return {
        type: SEARCH_ALL_USERS,
        payload: e
    }
}

export const getAllUsers = () => {
    return {
        type: GET_ALL_USERS,
        payload: axios.get("/Explore/All")
    }
}

export const getUserProfile = (user_id) => {
    return {
        type: GET_USER_PROFILE,
        payload: axios.get(`/Explore/User/${user_id}`)
    }
}

export const getGarage = (user_id) => {
    return {
        type: GET_USER_GARAGE,
        payload: axios.get(`/Explore/User/Garage/${user_id}`)
    }
}

export const getUserCar = (car_id) => {
    return {
        type: USER_CAR,
        payload: axios.get(`/garage/cars/${car_id}`)
    }
}

export const getUserCarTracks = (car_id) => {
    return {
        type: USER_CAR_TRACKS,
        payload: axios.get(`/races/cars/sessions/${car_id}`)
    }
}

export const getUserTracks = (user_id) => {
    return {
        type: USER_TRACKS,
        payload: axios.get(`/Explore/User/Tracks/${user_id}`)
    }
}

export const trackSessions = (user_id, track_id) => {
    return {
        type: TRACK_SESSIONS,
        payload: axios.get(`/Explore/User/Sessions/${user_id}/${track_id}`)
    }
}

export const sessionDetails = (session_id) => {
    return {
        type: SESSION_DETAILS,
        payload: axios.get(`/Explore/User/Session/${session_id}`)
    }
}

export const getUserPhotos = (user_id) => {
    return {
        type: USER_PHOTOS,
        payload: axios.get(`/Explore/User/Photos/${user_id}`)
    }
}

export default function reducer (state = initalState, action){
    const {type, payload} = action;
    switch(type){
        case `${GET_ALL_USERS}_PENDING`:
            return {...state, loading: true}
        case `${GET_ALL_USERS}_FULFILLED`:
            return {...state, loading: false, getAll: payload.data}
        case `${GET_USER_PROFILE}_PENDING`:
            return {...state, loading: true}
        case `${GET_USER_PROFILE}_FULFILLED`:
            return {...state, loading: false, userProfile: payload.data}
        case `${GET_USER_GARAGE}_PENDING`:
            return {...state, loading: true}
        case `${GET_USER_GARAGE}_FULFILLED`:
            return {...state, loading: false, userGarage: payload.data}
        case `${USER_CAR}_PENDING`:
            return {...state, loading: true}
        case `${USER_CAR}_FULFILLED`:
            return {...state, loading: false, userCar: payload.data}
        case `${USER_CAR_TRACKS}_PENDING`:
            return {...state, loading: true}
        case `${USER_CAR_TRACKS}_FULFILLED`:
            return {...state, loading: false, userCarTracks: payload.data}
        case `${USER_TRACKS}_PENDING`:
            return {...state, loading: true}
        case `${USER_TRACKS}_FULFILLED`:
            return {...state, loading: false, userTracks: payload.data}
        case `${TRACK_SESSIONS}_PENDING`:
            return {...state, loading: true}
        case `${TRACK_SESSIONS}_FULFILLED`:
            return {...state, loading: false, userTrackSessions: payload.data}
        case `${SESSION_DETAILS}_PENDING`:
            return {...state, loading: true}
        case `${SESSION_DETAILS}_FULFILLED`:
            return {...state, loading: false, userSessionDetails: payload.data}
        case `${USER_PHOTOS}_PENDING`:
            return {...state, loading: true}
        case `${USER_PHOTOS}_FULFILLED`:
            return {...state, loading: false, userPhotos: payload.data}
        default: 
            return state
    }
}