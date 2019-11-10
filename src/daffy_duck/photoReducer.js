import axios from 'axios'


const initalState = {
    picture: "",
    description: "",
    title: ""
}



const UPDATE_PICTURE = "UPDATE_PICTURE"
const UPDATE_STATE = "UPDATE_STATE"

export const updatePicture = () => {
    return{
        type: UPDATE_PICTURE
    }
}


export const updateState = (e) => {
    return {
        type: UPDATE_STATE
    }
}


export default function reducer(state = initalState, action){
    const {type, payload} = action;
    switch(type){
        case `${UPDATE_STATE}_PENDING`:
            return {...state, ...payload}
        default:
            return state
    }
}