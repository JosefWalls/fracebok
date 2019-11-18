import axios from 'axios'

const initalState = {
    getAll: [],
    allUsers: [],
    loading: false,
    userProfile: [],
    userGarage: []
}

const SEARCH_ALL_USERS = "SEARCH_ALL_USERS"
const GET_ALL_USERS = "GET_ALL_USERS"
const GET_USER_PROFILE = "GET_USER_PROFILE"
const GET_USER_GARAGE = "GET_USER_GARAGE"

export const searchAllUsers = (e) => {
    return {
        type: SEARCH_ALL_USERS,
        payload: e
    }
}

export const getAllUsers = () => {
    return {
        type: GET_ALL_USERS,
        payload: axios.get("/Explore/All")
    }
}

export const getUserProfile = (user_id) => {
    return {
        type: GET_USER_PROFILE,
        payload: axios.get(`/Explore/User/${user_id}`)
    }
}

export const getGarage = (user_id) => {
    return {
        type: GET_USER_GARAGE,
        payload: axios.get(`/Explore/User/Garage/${user_id}`)
    }
}

export default function reducer (state = initalState, action){
    const {type, payload} = action;
    switch(type){
        case `${GET_ALL_USERS}_PENDING`:
            return {...state, loading: true}
        case `${GET_ALL_USERS}_FULFILLED`:
            console.log(payload.data)
            return {...state, loading: false, getAll: payload.data}
        case `${GET_USER_PROFILE}_PENDING`:
            return {...state, loading: true}
        case `${GET_USER_PROFILE}_FULFILLED`:
            console.log(payload.data)
            return {...state, loading: false, userProfile: payload.data}
        case `${GET_USER_GARAGE}_PENDING`:
            return {...state, loading: true}
        case `${GET_USER_GARAGE}_FULFILLED`:
            console.log(payload.data)
            return {...state, loading: false, userGarage: payload.data}
        default: 
            return state
    }
}