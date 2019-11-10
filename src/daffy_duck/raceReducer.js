import axios from 'axios';

const initialState = {
    track_name: "",
    turns: "",
    length: "",
    loading: "",
    userTracks: [],
    track_id: "",
    car_id: "",
    laps: [],
    sessionId: "",
    trackSessions: [],
    sessionDetials: []
}


const UPDATE_STATE = "UPDATE_STATE"
const RETRIEVE_USER_TRACKS = "RETRIEVE_USER_TRACKS"
const TRACK_SESSIONS = "TRACK_SESSIONS"
const SESSION_DETAILS = "SESSION_DETAILS"

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

export const getSessionDetails = (session_id) => {
    return {
        type: SESSION_DETAILS,
        payload: axios.get(`session/${session_id}`)
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
            return {...state, loading: false, sessionDetials: payload.data}
        default:
            return state
    }
}