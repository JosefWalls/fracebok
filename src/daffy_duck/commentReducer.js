import axios from "axios";


const initalState = {
    loading: false,
    photoComments: [],
    comment: "",
    raceComments: []
}



const GET_PHOTO_COMMENTS = "GET_PHOTO_COMMENTS";
const UPDATE_STATE = "UPDATE_STATE";
const GET_RACE_COMMENTS = "GET_RACE_COMMENTS";

export const getPhotoComments =  (photo_id) => {
    return {
        type: GET_PHOTO_COMMENTS,
        payload: axios.get(`/Comment/View/Photo/${photo_id}`)
    }
}

export const updateState = (e) => {
    return {
        type: UPDATE_STATE,
        payload: e
    }
}

export const getRaceComments = (raceId) => {
    return {
        type: GET_RACE_COMMENTS,
        payload: axios.get(`/Comment/View/Race/${raceId}`)
    }
}

export default function reducer (state = initalState, action){
    const {type, payload} = action;
    switch(type){
        case `${GET_PHOTO_COMMENTS}_PENDING`:
            return {...state, loading: true}
        case `${GET_PHOTO_COMMENTS}_FULFILLED`:
            return {...state, loading: false, photoComments: payload.data}
        case UPDATE_STATE:
            return {...state, ...payload}
        case `${GET_RACE_COMMENTS}_PENDING`:
            return {...state, loading: true}
        case `${GET_RACE_COMMENTS}_FULFILLED`:
            console.log(payload.data)
            return {...state, loading: false, raceComments: payload.data}
        default:
            return state
    }
}