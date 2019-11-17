import axios from 'axios'


const initalState = {
    loading: false,
    title: "",
    description: "",
    track: "",
    session_id: "",
    photo: "",
    userImges: [],
    image: []
}


const UPDATE_STATE = "UPDATE_STATE"
const GET_USER_PHOTOS = "GET_USER_PHOTOS"
const VIEW_PHOTO = "VIEW_PHOTO"
const DELETE_PHOTO = "DELETE_PHOTO"
const EDIT_PHOTO = "EDIT_PHOTO";

export const updateState = (e) => {
    return {
        type: UPDATE_STATE,
        payload: e
    }
}

export const getUserPhotos = () => {
    return {
        type: GET_USER_PHOTOS,
        payload: axios.get("/photos/userImages")
    }
}

export const viewImage = (photo_id) => {
    return {
        type: VIEW_PHOTO,
        payload: axios.get(`/photos/getImage/${photo_id}`)
    }
}

export const deletePhoto = (photo_id) => {
    return {
        type: DELETE_PHOTO,
        payload: axios.delete(`/photos/DeleteImage/${photo_id}`)
    }
}

export const editPhoto = (photo_id) => {
    return {
        type: EDIT_PHOTO,
        payload: axios.put(`/photos/EditPhoto/${photo_id}`)
    }
}

export default function reducer(state = initalState, action){
    const {type, payload} = action
    switch(type){
        case UPDATE_STATE:
            return {...state, ...payload}
        case `${GET_USER_PHOTOS}_PENDING`:
            return {...state, loading: true}
        case `${GET_USER_PHOTOS}_FULFILLED`:
            return {...state, loading: false, userImages: payload.data}
        case `${VIEW_PHOTO}_PENDING`:
            return {...state, loading: true}
        case `${VIEW_PHOTO}_FULFILLED`:
            console.log(payload.data)
            return {...state, loading: false, image: payload.data}
        default:
            return state
    }
}