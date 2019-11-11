import axios from 'axios'


const initalState = {
    title: "",
    description: "",
    track: "",
    session_id: "",
    photo: ""
}


const UPDATE_STATE = "UPDATE_STATE"


export const updateState = (e) => {
    return {
        type: UPDATE_STATE,
        payload: e
    }
}



export default function reducer(state = initalState, action){
    const {type, payload} = action
    switch(type){
        case UPDATE_STATE:
            return {...state, ...payload}
        default:
            return state
    }
}