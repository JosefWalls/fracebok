import axios from 'axios'

const initalState = {
    user: {},
    loading: false
}


const RETRIEVE_INFO = "RETRIEVE_INFO"

export const retrieveInfo = () => {
    return {
        type: RETRIEVE_INFO,
        payload: axios.get("/api/profile")
    }
}


export default function reducer(state = initalState, action){
    const {type, payload} = action;
    switch(type){
        case `${RETRIEVE_INFO}_PENDING`:
            return {...state, loading: true}
        case `${RETRIEVE_INFO}_FULFILLED`:
            // console.log(payload.data)
            return {...state, loading: false, user: payload.data}
            // console.log(state)
        default:
            return state
    }
}