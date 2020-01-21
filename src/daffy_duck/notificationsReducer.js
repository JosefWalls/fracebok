import axios from "axios";

const initalState = {
    loading: true,
    photoNotifications: [],
    numberOfPhotoNotifications: 0,
    raceNotifications: [],
    numberOfRaceNotifications: 0
}


const GET_PHOTO_NOTIFICATIONS = "GET_PHOTO_NOTIFICATIONS";
const UPDATE_STATE = "UPDATE_STATE";
const UPDATE_PHOTO_STATUS = "UPDATE_PHOTO_STATUS";
const GET_RACE_NOTIFICATIONS = "GET_RACE_NOTIFICATIONS";
const UPDATE_RACE_STATUS = "UPDATE_RACE_STATUS";    

export const getPhotoNotifications = () => {
    return {
        type: GET_PHOTO_NOTIFICATIONS,
        payload: axios.get(`/Notification/Unseen/Photo`)
    }
}

export const updateState = (e) => {
    return {
        type: UPDATE_STATE,
        payload: e
    }
}

export const updatePhotoStatus = (postid) => {
    return {
        type: UPDATE_PHOTO_STATUS,
        payload: axios.put(`/Notification/Seen/Photo/${postid}`)
    }
}

export const getRaceNotificatins = () => {
    return {
        type: GET_RACE_NOTIFICATIONS,
        payload: axios.get("/Notification/Unseen/Race")
    }
}

export const updateRaceStatus = (postid) => {
    return {
        type: UPDATE_RACE_STATUS,
        payload: axios.put(`/Notifications/Seen/Race/${postid}`)
    }
}


export default function reducer (state = initalState, action){
    const {type, payload} = action;
    switch(type){
        case `${GET_PHOTO_NOTIFICATIONS}_PENDING`:
            return {...state, loading: true}
        case  `${GET_PHOTO_NOTIFICATIONS}_FULFILLED`:
            return {...state, loading: false, photoNotifications: payload.data}
        case `${UPDATE_PHOTO_STATUS}_PENDING`:
            return {...state, loading: true}
        case  `${UPDATE_PHOTO_STATUS}_FULFILLED`:
            return {...state, loading: false}
        case UPDATE_STATE:
            return {...state, ...payload}
        case `${GET_RACE_NOTIFICATIONS}_PENDING`:
            return {...state, loading: true}
        case `${GET_RACE_NOTIFICATIONS}_FULFILLED`:
            return {...state, loading: false, raceNotifications: payload.data}
        case `${UPDATE_RACE_STATUS}_PENDING`:
            return {...state, loading: true}
        case `${UPDATE_RACE_STATUS}_FULFILLED`:
            return {...state, loading: false}
        default: 
            return state
    }
}