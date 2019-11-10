import axios from 'axios'

const initalState = {
    loading: false,
    bestLap: "",
    labels: []
}



const GET_BEST_LAP = "GET_BEST_LAP"
const CREATE_LABELS = "CREATE_LABELS"

export const getBestLap = (session_id) => {
    return {
        type: GET_BEST_LAP,
        payload: axios.get(`/session/bestlap/${session_id}`)
    }
}

export const createLabels = (session_id) => {
    return {
        type: CREATE_LABELS,
        payload: axios.get(`/session/length/${session_id}`)
    }
}

export default function (state = initalState, action){
    const {type, payload} = action;
    switch(type){
        case `${GET_BEST_LAP}_PENDING`:
            return {...state, loading: true, bestLap: "np"}
        case `${GET_BEST_LAP}_FULFILLED`:
            // console.log(payload.data[0].time)
            return {...state, loadng: false, bestLap: payload.data[0].time}
        case `${CREATE_LABELS}_PENDING`:
            return {...state, loading: true}
        case `${CREATE_LABELS}_FULFILLED`:
            return {...state, loading: false, labels: payload.data}
        default: 
            return state
    }
}