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
    trackSessions: []
}

const UPDATE_STATE = "UPDATE_STATE"
const RETRIEVE_USER_TRACKS = "RETRIEVE_USER_TRACKS"
const TRACK_ID = "TRACK_ID"

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

// export const trackId = (track_id) => {
//     return {
//         type: TRACK_ID,
//         payload: 
//     }
// }

export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case UPDATE_STATE:
            return {...state, ...payload}
        case `${RETRIEVE_USER_TRACKS}_PENDING`:
            return {...state, loading: true}
        case `${RETRIEVE_USER_TRACKS}_FULFILLED`:
            return {...state, loading: false, userTracks: payload.data}
        default:
            return state
    }
}