import axios from 'axios';

const initialState = {
    track_name: "",
    turns: "",
    length: "",
    loading: "",
    userTracks: [],
    userCars: [],
    track_id: "",
    car_id: "",
    laps: [],
    sessionId: "",
    trackSessions: [],
    sessionDetails: [],
    trackDetails: {},
    carSessions: []
}


const UPDATE_STATE = "UPDATE_STATE"
const RETRIEVE_USER_TRACKS = "RETRIEVE_USER_TRACKS"
const TRACK_SESSIONS = "TRACK_SESSIONS"
const SESSION_DETAILS = "SESSION_DETAILS"
const DELETE_SESSION = "DELETE_SESSION"
const EDIT_TRACK = "EDIT_TRACK"
const DELETE_TRACK = "DELETE_TRACK"
const CAR_SESSIONS = "CAR_SESSIONS"
const TRACK_DETAILS = "TRACK_DETAILS"

export const updateState = (e) => {
    return {
        type: UPDATE_STATE,
        payload: e
    }
}

export const retrieveUserTracks = () => {
    return {
        type: RETRIEVE_USER_TRACKS,
        payload: axios.get("/races/tracks")
    }
}


export const getTrackSessions = (track_id) => {
    return {
        type: TRACK_SESSIONS,
        payload: axios.get(`/races/${track_id}`)
    }
}

export const getCarSessions = (car_id) => {
    return {
        type: CAR_SESSIONS,
        payload: axios.get(`/races/cars/${car_id}`)
    }
}

export const getSessionDetails = (session_id) => {
    return {
        type: SESSION_DETAILS,
        payload: axios.get(`session/${session_id}`)
    }
}

export const deleteSession = (session_id) => {
    return {
        type: DELETE_SESSION,
        payload: axios.delete(`/races/delete/${session_id}`)
    }
}

export const editTrack = (track_id) => {
    return {
        type: EDIT_TRACK,
        payload: axios.put(`/races/EditTrack/${track_id}`)
    }
}

export const deleteTrack = (track_id) => {
    return {
        type: DELETE_TRACK,
        payload: axios.delete(`/races/DeleteTrack/${track_id}`)
    }
}

export const getTrackDetails = (session_id) => {
    return {
        type: TRACK_DETAILS,
        payload: axios.get(`/races/trackInfo/${session_id}`)
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case UPDATE_STATE:
            return {...state, ...payload}
        case `${RETRIEVE_USER_TRACKS}_PENDING`:
            return {...state, loading: true}
        case `${RETRIEVE_USER_TRACKS}_FULFILLED`:
            return {...state, loading: false, userTracks: payload.data}
        case `${TRACK_SESSIONS}_PENDING`:
            return {...state, loading: true}
        case `${TRACK_SESSIONS}_FULFILLED`:
            return {...state, loading: false, trackSessions: payload.data}
        case `${SESSION_DETAILS}_PENDING`:
            return {...state, loading: true}
        case `${SESSION_DETAILS}_FULFILLED`:
            return {...state, loading: false, sessionDetails: payload.data}
        case `${DELETE_SESSION}_PENDING`:
            return {...state, loading: true}
        case `${DELETE_SESSION}_FULFILLED`:
            return {...state, loading: false}
        case `${EDIT_TRACK}_PENDING`:
            return {...state, loading: true}
        case `${EDIT_TRACK}_FULFILLED`:
            return {...state, loading: false}
        case `${DELETE_TRACK}_PENDING`:
            return {...state, loading: true}
        case `${DELETE_TRACK}_FULFILLED`:
            return {...state, loading: false}
        case `${CAR_SESSIONS}_PENDING`:
            return {...state, loading: true}
        case `${CAR_SESSIONS}_FULFILLED`:
            return {...state, loading: false, carSessions: payload.data} 
        case `${TRACK_DETAILS}_PENDING`:
            return {...state, loading: true}
        case `${TRACK_DETAILS}_FULFILLED`:
            return {...state, loading: false, trackDetails: payload.data}
        default:
            return state
    }
}