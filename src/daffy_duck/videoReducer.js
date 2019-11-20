import Axios from "axios"

const initalState = {
    loading: false,
    videos: [],
    video: []
}

const GET_VIDEOS = "GET_VIDEOS";
const GET_VIDEO = "GET_VIDEO";
const DELETE_VIDEO = "DELETE_VIDEO"


export const getVideos = () => {
    return {
        type: GET_VIDEOS,
        payload: Axios.get("/Videos")
    }
}

export const getVideo = (video_id) => {
    return {
        type: GET_VIDEO,
        payload: Axios.get(`/Video/${video_id}`)
    }
}

export const deleteVideo = (video_id) => {
    return {
        type: DELETE_VIDEO,
        payload: Axios.delete(`/Videos/Delete/${video_id}`)
    }
}

export default function reducer (state = initalState, action){
    const {type, payload} = action;
    switch(type){
        case `${GET_VIDEOS}_PENDING`:
            return {...state, loading: true}
        case `${GET_VIDEOS}_FULFILLED`:
            return {...state, loading: false, videos: payload.data}
        case `${GET_VIDEO}_PENDING`:
            return {...state, loading: true}
        case `${GET_VIDEO}_FULFILLED`:
            return {...state, loading: false, video: payload.data}
        case `${DELETE_VIDEO}_PENDING`:
            return {...state, loading: true}
        case `${DELETE_VIDEO}_FULFILLED`:
            return {...state, loading: false}
        default:
            return state
    }
}